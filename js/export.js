import { state } from './state.js';
import { STAGE_LABEL_SHORT, catLabel, showToast } from './app.js';

export function exportCurrentTemplates(){
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


/** Downloads the unchanged full-site JSON backup format. */
export function exportJsonBackup(){
  const dump = { version: '3.0', exportedAt: new Date().toISOString(), categories: state.categories, customVars: state.customVars, templates: state.templates };
  const blob = new Blob([JSON.stringify(dump, null, 2)], {type:'application/json'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `小幫手話術全站備份_${new Date().toISOString().slice(0,10)}.json`;
  link.click();
}
