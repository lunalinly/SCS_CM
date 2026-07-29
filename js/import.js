import { state } from './state.js';
import * as storage from './storage.js';

const IMPORT_HEADER_ALIASES = {
  stage:['階段','stage','對話階段'],
  category:['類型','分類','問題類型','category'],
  saletype:['售前售後','售前/售後','情境','saletype'],
  title:['標題','title','名稱'],
  content:['內容','回覆','回覆內容','第一版','預設回覆','content'],
  appendWait:['附帶查詢中','加上請稍等','附帶等待話術'],
  hint:['提示','建議動作','動作','hint'],
  link:['連結','link','網址']
};
const VARIANT_COL_KEYWORDS = ['其他回覆', '回覆方式', '版本'];

export function stageFromText(s){
  s = (s==null? '' : String(s)).trim();
  if(/開頭/.test(s)) return 'open';
  if(/結尾|结尾/.test(s)) return 'close';
  if(/查詢|等待|時間/.test(s)) return 'wait';
  if(/中段|回答|body/i.test(s)) return 'body';
  return null;
}


export function saleTypeFromText(s){
  s = (s==null? '' : String(s)).trim();
  if(/皆可|通用|都可/.test(s)) return 'both';
  if(/售前/.test(s)) return 'pre';
  if(/售後|售后/.test(s)) return 'post';
  return null;
}


export function findCol(rowKeys, aliases){
  return rowKeys.find(k => aliases.some(a => String(k).toLowerCase().includes(a.toLowerCase())));
}


export function findVariantCols(rowKeys){
  return rowKeys.filter(k => VARIANT_COL_KEYWORDS.some(kw => String(k).toLowerCase().includes(kw)));
}


export function resolveCategory(text, workingCats){
  const label = (text==null? '' : String(text)).trim();
  if(!label) return null;
  let found = workingCats.find(c => c.label===label || label.includes(c.label) || c.label.includes(label));
  if(found) return found;
  const created = {id:'c'+Date.now()+'_'+Math.random().toString(36).slice(2,5), label, emoji:'🏷️'};
  workingCats.push(created);
  return created;
}

function importFromRows(rows){
  const keys = Object.keys(rows[0] || {});
  const col = {
    stage: findCol(keys, IMPORT_HEADER_ALIASES.stage),
    category: findCol(keys, IMPORT_HEADER_ALIASES.category),
    saletype: findCol(keys, IMPORT_HEADER_ALIASES.saletype),
    title: findCol(keys, IMPORT_HEADER_ALIASES.title),
    content: findCol(keys, IMPORT_HEADER_ALIASES.content),
    appendWait: findCol(keys, IMPORT_HEADER_ALIASES.appendWait),
    hint: findCol(keys, IMPORT_HEADER_ALIASES.hint),
    link: findCol(keys, IMPORT_HEADER_ALIASES.link)
  };
  const variantCols = findVariantCols(keys);
  
  if(!col.title || !col.content){
    return {error:'找不到「標題」或「回覆內容」欄位,請確認 Excel 欄位名稱,或先下載範本參考格式。'};
  }
  const workingCats = state.categories.map(c=>({...c}));
  const valid = []; let skipped = 0;
  
  rows.forEach((r,i)=>{
    const title = String(r[col.title] ?? '').trim();
    let content = String(r[col.content] ?? '').trim();
    if(!title || !content){ skipped++; return; }
    const stage = (col.stage ? stageFromText(r[col.stage]) : null) || 'body';
    let category = null;
    if(stage==='body'){
      const catText = col.category ? String(r[col.category] ?? '').trim() : '';
      const resolved = resolveCategory(catText, workingCats) || workingCats.find(c=>c.label==='其他') || workingCats[0];
      category = resolved ? resolved.id : null;
    }
    let saleType = null;
    if(stage==='open' || stage==='close' || stage==='body'){
      const raw = col.saletype ? saleTypeFromText(r[col.saletype]) : null;
      saleType = raw || (stage==='body' ? 'both' : 'post');
    }
    
    let variants = [];
    variantCols.forEach(vc => {
      const vText = String(r[vc] ?? '').trim();
      if(vText) {
        const splitted = vText.split(/\n?===\n?/).map(v=>v.trim()).filter(Boolean);
        variants.push(...splitted);
      }
    });

    const appendWaitText = col.appendWait ? String(r[col.appendWait] ?? '').trim() : '';
    const appendWait = stage==='body' && /是|Y|True|1/i.test(appendWaitText);
    
    const hint = col.hint ? String(r[col.hint] ?? '').trim() : '';
    const link = col.link ? String(r[col.link] ?? '').trim() : '';
    
    valid.push({
      id:'x'+Date.now()+'_'+i+Math.random().toString(36).slice(2,5), 
      stage, category, saleType, title, content, variants, 
      appendWait: appendWait || undefined,
      hint: hint || undefined, link: link || undefined
    });
  });
  
  const existingIds = new Set(state.categories.map(c=>c.id));
  const newCategories = workingCats.filter(c=>!existingIds.has(c.id));
  return {valid, skipped, newCategories};
}

function openImportConfirmModal(result, filename){
  const counts = {open:0, body:0, wait:0, close:0};
  result.valid.forEach(t=> counts[t.stage]++);
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-head"><h3>匯入 Excel 話術</h3><button class="icon-btn" id="impClose">${icon('x')}</button></div>
      <div class="modal-body">
        <p class="field-hint" style="margin:0;">從「${escapeHtml(filename)}」讀到 <b>${result.valid.length}</b> 則有效話術${result.skipped?`(略過 ${result.skipped} 筆缺少標題或內容的資料)`:''}:</p>
        <p class="field-hint" style="margin:0;">開頭 ${counts.open}・中段 ${counts.body}・查詢中 ${counts.wait}・結尾 ${counts.close}</p>
        ${result.newCategories.length ? `<p class="field-hint" style="margin:0;">將會新增問題類型:${result.newCategories.map(c=>escapeHtml(c.label)).join('、')}</p>` : ''}
        <div class="field">
          <label>匯入方式</label>
          <label style="display:flex;align-items:center;gap:8px;font-weight:500;font-size:13px;color:var(--ink);margin-bottom:8px;">
            <input type="radio" name="impMode" value="append" checked style="width:auto;"> 加到目前的話術(保留本機已有的內容)
          </label>
          <label style="display:flex;align-items:center;gap:8px;font-weight:500;font-size:13px;color:var(--ink);">
            <input type="radio" name="impMode" value="replace" style="width:auto;"> 取代全部話術(清空現有，只保留本次匯入)
          </label>
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn btn-ghost" id="impCancel">取消</button>
        <button class="btn btn-primary" id="impConfirm">${icon('check',' style="stroke:#fff;width:13px;height:13px"')} 確認匯入</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#impClose').onclick = ()=>overlay.remove();
  overlay.querySelector('#impCancel').onclick = ()=>overlay.remove();
  overlay.onclick = (e)=>{ if(e.target===overlay) overlay.remove(); };
  overlay.querySelector('#impConfirm').onclick = async ()=>{
    const mode = overlay.querySelector('input[name=impMode]:checked').value;
    state.templates = (mode==='replace') ? result.valid.slice() : [...result.valid, ...templates];
    if(result.newCategories.length){
      state.categories = [...categories, ...result.newCategories];
      await storage.saveCategories(state.categories);
    }
    await storage.saveTemplates(state.templates);
    overlay.remove();
    renderAll();
    renderCompose();
    showToast(`已成功匯入並保存 ${result.valid.length} 則話術！`);
  };
}

function exportCurrentTemplates(){
  if(typeof XLSX==='undefined'){ showToast('匯出功能載入中,請稍後再試一次', true); return; }
  if(!state.templates.length){ showToast('目前沒有話術可以匯出', true); return; }
  
  let maxVariants = 0;
  state.templates.forEach(t=>{ if(t.variants && t.variants.length > maxVariants) maxVariants = t.variants.length; });
  
  const saleTypeLabel = {pre:'售前', post:'售後', both:'皆可'};
  const rows = state.templates.map(t=>{
    const row = {
      '階段': STAGE_LABEL_SHORT[t.stage] || t.stage,
      '售前售後': t.saleType ? (saleTypeLabel[t.saleType]||'') : '',
      '類型': t.category ? catLabel(t.category) : '',
      '標題': t.title,
      '回覆內容': t.content,
      '附帶查詢中': t.appendWait ? '是' : '否'
    };
    for(let i=0; i<maxVariants; i++){
      row[`回覆方式${i+2}`] = (t.variants && t.variants[i]) ? t.variants[i] : '';
    }
    row['提示'] = t.hint || '';
    row['參考連結'] = t.link || '';
    return row;
  });
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '話術清單');
  const dateStr = new Date().toISOString().slice(0,10);
  XLSX.writeFile(wb, `客服話術匯出_${dateStr}.xlsx`);
}

function openJsonBackupModal(){
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-head"><h3>全站 JSON 備份與還原</h3><button class="icon-btn" id="bkClose">${icon('x')}</button></div>
      <div class="modal-body">
        <p class="field-hint" style="margin:0;">當您需要在不同電腦或瀏覽器間轉移資料，或升級 GitHub 程式版本前，可使用完整的 JSON 備份檔。</p>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:10px;">
          <button class="btn btn-ghost" id="btnDownloadJson" style="justify-content:flex-start;">
            <svg class="icon" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            下載全站 JSON 備份檔
          </button>
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn btn-primary" id="bkDone">關閉</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.querySelector('#btnDownloadJson').onclick = ()=>{
    const dump = {
      version: '3.0',
      exportedAt: new Date().toISOString(),
      categories: state.categories,
      customVars: state.customVars,
      templates: state.templates
    };
    const blob = new Blob([JSON.stringify(dump, null, 2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `小幫手話術全站備份_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    showToast('已下載 JSON 備份檔');
  };

  overlay.querySelector('#bkClose').onclick = ()=>overlay.remove();
  overlay.querySelector('#bkDone').onclick = ()=>overlay.remove();
  overlay.onclick = (e)=>{ if(e.target===overlay) overlay.remove(); };
}

function escapeHtml(str){
  return String(str||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}


export function importFromRows(rows){
  const keys = Object.keys(rows[0] || {});
  const col = {
    stage: findCol(keys, IMPORT_HEADER_ALIASES.stage),
    category: findCol(keys, IMPORT_HEADER_ALIASES.category),
    saletype: findCol(keys, IMPORT_HEADER_ALIASES.saletype),
    title: findCol(keys, IMPORT_HEADER_ALIASES.title),
    content: findCol(keys, IMPORT_HEADER_ALIASES.content),
    appendWait: findCol(keys, IMPORT_HEADER_ALIASES.appendWait),
    hint: findCol(keys, IMPORT_HEADER_ALIASES.hint),
    link: findCol(keys, IMPORT_HEADER_ALIASES.link)
  };
  const variantCols = findVariantCols(keys);
  
  if(!col.title || !col.content){
    return {error:'找不到「標題」或「回覆內容」欄位,請確認 Excel 欄位名稱,或先下載範本參考格式。'};
  }
  const workingCats = state.categories.map(c=>({...c}));
  const valid = []; let skipped = 0;
  
  rows.forEach((r,i)=>{
    const title = String(r[col.title] ?? '').trim();
    let content = String(r[col.content] ?? '').trim();
    if(!title || !content){ skipped++; return; }
    const stage = (col.stage ? stageFromText(r[col.stage]) : null) || 'body';
    let category = null;
    if(stage==='body'){
      const catText = col.category ? String(r[col.category] ?? '').trim() : '';
      const resolved = resolveCategory(catText, workingCats) || workingCats.find(c=>c.label==='其他') || workingCats[0];
      category = resolved ? resolved.id : null;
    }
    let saleType = null;
    if(stage==='open' || stage==='close' || stage==='body'){
      const raw = col.saletype ? saleTypeFromText(r[col.saletype]) : null;
      saleType = raw || (stage==='body' ? 'both' : 'post');
    }
    
    let variants = [];
    variantCols.forEach(vc => {
      const vText = String(r[vc] ?? '').trim();
      if(vText) {
        const splitted = vText.split(/\n?===\n?/).map(v=>v.trim()).filter(Boolean);
        variants.push(...splitted);
      }
    });

    const appendWaitText = col.appendWait ? String(r[col.appendWait] ?? '').trim() : '';
    const appendWait = stage==='body' && /是|Y|True|1/i.test(appendWaitText);
    
    const hint = col.hint ? String(r[col.hint] ?? '').trim() : '';
    const link = col.link ? String(r[col.link] ?? '').trim() : '';
    
    valid.push({
      id:'x'+Date.now()+'_'+i+Math.random().toString(36).slice(2,5), 
      stage, category, saleType, title, content, variants, 
      appendWait: appendWait || undefined,
      hint: hint || undefined, link: link || undefined
    });
  });
  
  const existingIds = new Set(state.categories.map(c=>c.id));
  const newCategories = workingCats.filter(c=>!existingIds.has(c.id));
  return {valid, skipped, newCategories};
}

function openImportConfirmModal(result, filename){
  const counts = {open:0, body:0, wait:0, close:0};
  result.valid.forEach(t=> counts[t.stage]++);
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-head"><h3>匯入 Excel 話術</h3><button class="icon-btn" id="impClose">${icon('x')}</button></div>
      <div class="modal-body">
        <p class="field-hint" style="margin:0;">從「${escapeHtml(filename)}」讀到 <b>${result.valid.length}</b> 則有效話術${result.skipped?`(略過 ${result.skipped} 筆缺少標題或內容的資料)`:''}:</p>
        <p class="field-hint" style="margin:0;">開頭 ${counts.open}・中段 ${counts.body}・查詢中 ${counts.wait}・結尾 ${counts.close}</p>
        ${result.newCategories.length ? `<p class="field-hint" style="margin:0;">將會新增問題類型:${result.newCategories.map(c=>escapeHtml(c.label)).join('、')}</p>` : ''}
        <div class="field">
          <label>匯入方式</label>
          <label style="display:flex;align-items:center;gap:8px;font-weight:500;font-size:13px;color:var(--ink);margin-bottom:8px;">
            <input type="radio" name="impMode" value="append" checked style="width:auto;"> 加到目前的話術(保留本機已有的內容)
          </label>
          <label style="display:flex;align-items:center;gap:8px;font-weight:500;font-size:13px;color:var(--ink);">
            <input type="radio" name="impMode" value="replace" style="width:auto;"> 取代全部話術(清空現有，只保留本次匯入)
          </label>
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn btn-ghost" id="impCancel">取消</button>
        <button class="btn btn-primary" id="impConfirm">${icon('check',' style="stroke:#fff;width:13px;height:13px"')} 確認匯入</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#impClose').onclick = ()=>overlay.remove();
  overlay.querySelector('#impCancel').onclick = ()=>overlay.remove();
  overlay.onclick = (e)=>{ if(e.target===overlay) overlay.remove(); };
  overlay.querySelector('#impConfirm').onclick = async ()=>{
    const mode = overlay.querySelector('input[name=impMode]:checked').value;
    state.templates = (mode==='replace') ? result.valid.slice() : [...result.valid, ...templates];
    if(result.newCategories.length){
      state.categories = [...categories, ...result.newCategories];
      await storage.saveCategories(state.categories);
    }
    await storage.saveTemplates(state.templates);
    overlay.remove();
    renderAll();
    renderCompose();
    showToast(`已成功匯入並保存 ${result.valid.length} 則話術！`);
  };
}

function exportCurrentTemplates(){
  if(typeof XLSX==='undefined'){ showToast('匯出功能載入中,請稍後再試一次', true); return; }
  if(!state.templates.length){ showToast('目前沒有話術可以匯出', true); return; }
  
  let maxVariants = 0;
  state.templates.forEach(t=>{ if(t.variants && t.variants.length > maxVariants) maxVariants = t.variants.length; });
  
  const saleTypeLabel = {pre:'售前', post:'售後', both:'皆可'};
  const rows = state.templates.map(t=>{
    const row = {
      '階段': STAGE_LABEL_SHORT[t.stage] || t.stage,
      '售前售後': t.saleType ? (saleTypeLabel[t.saleType]||'') : '',
      '類型': t.category ? catLabel(t.category) : '',
      '標題': t.title,
      '回覆內容': t.content,
      '附帶查詢中': t.appendWait ? '是' : '否'
    };
    for(let i=0; i<maxVariants; i++){
      row[`回覆方式${i+2}`] = (t.variants && t.variants[i]) ? t.variants[i] : '';
    }
    row['提示'] = t.hint || '';
    row['參考連結'] = t.link || '';
    return row;
  });
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '話術清單');
  const dateStr = new Date().toISOString().slice(0,10);
  XLSX.writeFile(wb, `客服話術匯出_${dateStr}.xlsx`);
}

function openJsonBackupModal(){
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-head"><h3>全站 JSON 備份與還原</h3><button class="icon-btn" id="bkClose">${icon('x')}</button></div>
      <div class="modal-body">
        <p class="field-hint" style="margin:0;">當您需要在不同電腦或瀏覽器間轉移資料，或升級 GitHub 程式版本前，可使用完整的 JSON 備份檔。</p>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:10px;">
          <button class="btn btn-ghost" id="btnDownloadJson" style="justify-content:flex-start;">
            <svg class="icon" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            下載全站 JSON 備份檔
          </button>
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn btn-primary" id="bkDone">關閉</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.querySelector('#btnDownloadJson').onclick = ()=>{
    const dump = {
      version: '3.0',
      exportedAt: new Date().toISOString(),
      categories: state.categories,
      customVars: state.customVars,
      templates: state.templates
    };
    const blob = new Blob([JSON.stringify(dump, null, 2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `小幫手話術全站備份_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    showToast('已下載 JSON 備份檔');
  };

  overlay.querySelector('#bkClose').onclick = ()=>overlay.remove();
  overlay.querySelector('#bkDone').onclick = ()=>overlay.remove();
  overlay.onclick = (e)=>{ if(e.target===overlay) overlay.remove(); };
}

function escapeHtml(str){
  return String(str||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}


/** Restores the existing JSON backup format in replace mode. */
export async function restoreJsonBackup(dump){
  if(!dump.templates || !Array.isArray(dump.templates)) return false;
  state.templates = dump.templates;
  if(dump.categories && Array.isArray(dump.categories)) state.categories = dump.categories;
  if(dump.customVars && Array.isArray(dump.customVars)) state.customVars = dump.customVars;
  await storage.saveTemplates(state.templates);
  await storage.saveCategories(state.categories);
  storage.saveCustomVars(state.customVars);
  return true;
}
