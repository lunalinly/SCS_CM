
/* 全站 SVG Icon 庫 */
const ICONS = {
  plus:'<path d="M12 5v14M5 12h14"/>',
  copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>',
  trash:'<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/>',
  up:'<path d="M18 15l-6-6-6 6"/>',
  down:'<path d="M6 9l6 6 6-6"/>',
  x:'<path d="M18 6L6 18M6 6l12 12"/>',
  check:'<path d="M20 6L9 17l-5-5"/>',
  chat:'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  store:'<path d="M4 8l8-5 8 5M4 8v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M4 8l2 12M20 8l-2 12M9 12a3 3 0 0 0 6 0"/>',
  alert:'<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
  lightbulb:'<path d="M9 18h6M10 22h4M15 14.5a7 7 0 1 0-6 0C7.5 15.8 7 17 7 18h10c0-1-.5-2.2-2-3.5z"/>',
  link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  settings:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>'
};
function icon(name, extra=''){ return `<svg class="icon" ${extra} viewBox="0 0 24 24">${ICONS[name]||''}</svg>`; }

function customConfirm(msg, onConfirm) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" style="max-width:340px;">
      <div class="modal-body" style="padding:24px;">
        <p style="margin:0 0 16px; font-size:14px; font-weight:600; line-height:1.6; color:var(--ink); text-align:center;">${msg}</p>
        <div style="display:flex; gap:10px; justify-content:center;">
          <button class="btn btn-ghost" id="confirmCancel">取消</button>
          <button class="btn btn-primary" id="confirmOk">確定</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#confirmCancel').onclick = () => overlay.remove();
  overlay.querySelector('#confirmOk').onclick = () => {
    overlay.remove();
    onConfirm();
  };
}

const STAGE_LABEL = {open:'開頭問候', wait:'查詢中／需要時間', body:'中段回覆', close:'結尾／滿意度'};
const STAGE_LABEL_SHORT = {open:'開頭', wait:'查詢中', body:'中段', close:'結尾'};

const STORAGE_KEY = 'helper_script_templates_v3';
const CATEGORY_STORAGE_KEY = 'helper_script_categories_v3';
const CUSTOM_VARS_KEY = 'helper_script_custom_vars_v3';
const EDITOR_CODE_VAR = '小編代號';
const EDITOR_CODE_VALUE_KEY = 'helper_script_editor_code_v1';

const SEED_CATEGORIES = [
  {id:'logistics', label:'物流', emoji:'🚚'},
  {id:'return', label:'退換貨', emoji:'📦'},
  {id:'payment', label:'付款', emoji:'💳'},
  {id:'product', label:'商品/庫存', emoji:'🛍️'},
  {id:'other', label:'其他', emoji:'💬'}
];

const SEED_TEMPLATES = [
  {id:'s1', stage:'open', category:null, saleType:'pre', title:'售前開場', content:'您好,我是小幫手[BS],很高興為您服務!請問想詢問什麼呢?'},
  {id:'s2', stage:'open', category:null, saleType:'post', title:'售後開場(客人已提供訂單編號)', content:'親愛的顧客您好,已收到您的訂單編號 {訂單編號},小幫手正在為您查詢中,請您稍等一下喔!'},
  {id:'s20', stage:'open', category:null, saleType:'post', title:'售後開場(客人尚未提供訂單編號)', content:'您好,我是小幫手[BS],為了盡快協助您查詢,麻煩您提供一下訂單編號,小幫手確認後立即為您處理喔!'},

  {id:'s3', stage:'wait', category:null, title:'補貨時間無法即時得知', hint:'可以提醒客人到商品頁點擊愛心收藏,上架會第一時間通知。', content:'不好意思,由於小幫手也無法即時知道補貨的相關時間以及補貨的具體安排,建議您可點擊商品頁的愛心,就可掌握最新的商品近況喔![BS]'},
  {id:'s4', stage:'wait', category:null, title:'需要跟後台再次確認', content:'不好意思,這部分小幫手需要再跟後台確認一下,請您稍等幾分鐘,確認後小幫手會立即回覆您喔!'},
  {id:'s5', stage:'wait', category:null, title:'近期訊息量大,需要多點時間', content:'不好意思,近期詢問的顧客較多,小幫手需要多一點時間為您查詢,還請您耐心等候一下,謝謝您的體諒!'},
  {id:'s6', stage:'wait', category:null, title:'需要客人補充資訊才能查', content:'為了能盡快協助您處理,麻煩您提供一下訂單編號 {訂單編號} 以及問題截圖,小幫手確認後會盡快回覆您喔!'},

  {id:'s7', stage:'body', category:'logistics', saleType:'post', title:'包裹物流查詢中', content:'親愛的顧客您好,您的訂單 {訂單編號} 目前物流狀態顯示為「{物流狀態}」,若超過預計送達時間 {天數} 天仍未收到,歡迎再次與我們聯繫,小幫手會協助您進一步處理喔!', variants:['親愛的顧客您好,系統顯示您的包裹目前為「{物流狀態}」,預計還需要 {天數} 天送達,請您耐心等候一下喔!']},
  {id:'s8', stage:'body', category:'logistics', saleType:'post', title:'收件地址填寫錯誤', appendWait:true, content:'若訂單尚未出貨,建議您先聯繫賣家協助修改收件地址;若已經出貨,建議直接與物流業者聯繫改址或攔截包裹喔!'},
  {id:'s9', stage:'body', category:'return', saleType:'post', title:'申請退貨流程說明', hint:'退貨申請入口在:訂單頁面 →「申請退貨/退款」。', content:'親愛的顧客您好,退貨申請可至訂單頁面點選「申請退貨/退款」,選擇退貨原因並上傳商品照片,送出後賣家將於期限內審核回覆您喔!'},
  {id:'s10', stage:'body', category:'return', saleType:'post', title:'退款進度查詢', appendWait:true, content:'您的退款申請已受理,款項將於審核通過後 {天數} 個工作天內原路退回,實際入帳時間會依付款方式略有不同,請您耐心等候喔!'},
  {id:'s11', stage:'body', category:'payment', saleType:'pre', title:'付款失敗處理', content:'若付款時顯示失敗,建議您先確認卡片額度、有效期限,或改用其他付款方式再試一次;若仍無法成功,歡迎截圖錯誤訊息給小幫手協助查看喔!'},
  {id:'s12', stage:'body', category:'payment', saleType:'post', title:'重複扣款反映', appendWait:true, content:'若發現有重複扣款的狀況,麻煩您提供扣款明細截圖,小幫手會盡快為您確認並協助處理退款事宜喔!'},
  {id:'s13', stage:'body', category:'product', saleType:'pre', title:'商品庫存/補貨查詢', hint:'可以提醒客人到商品頁點擊愛心收藏,上架會第一時間通知。', content:'目前商品頁顯示的庫存為即時狀態,若顯示缺貨,建議您點擊商品頁的愛心收藏,上架通知會第一時間提醒您喔!'},
  {id:'s14', stage:'body', category:'product', saleType:'pre', title:'商品規格詢問', content:'商品的詳細規格、顏色及尺寸資訊都會標示在商品頁的說明欄位,建議您可以再確認一下,如果還有不清楚的地方歡迎再詢問小幫手喔!'},
  {id:'s17', stage:'body', category:'other', saleType:'both', title:'需再確認規定的通用回覆', appendWait:true, content:'不好意思,您反映的狀況小幫手需要再確認一下相關規定,麻煩您稍等一下,確認後會盡快回覆您喔!'},

  {id:'s18', stage:'close', category:null, saleType:'post', title:'售後完整結尾(含滿意度提醒)', content:'感謝您與我們聯繫!若後續仍需協助,歡迎隨時與我們聊聊,小幫手會在服務時間內儘快回覆您。\n\n由於近期訊息量較多,團隊仍在積極處理中,回覆時間可能較長,感謝您的體諒與耐心等候。\n\n對話結束將進行滿意度調查,希望能獲得您的支持與鼓勵,您的滿意度是我們持續進步的最大動力,非常感謝您的肯定與支持!💗[BS]'},
  {id:'s19', stage:'close', category:null, saleType:'post', title:'售後簡短結尾', content:'感謝您的耐心等候與體諒,若還有其他問題都歡迎隨時與小幫手聯繫喔!祝您購物愉快![BS]'},
  {id:'s21', stage:'close', category:null, saleType:'pre', title:'售前結尾', content:'謝謝您的詢問!如果還有其他想了解的地方,都歡迎隨時再詢問小幫手喔![BS]'}
];

let categories = [];
let templates = [];
let composeList = []; 
let varsValues = {};
let customVars = ['訂單編號']; 
let activeStage = 'all';
let activeCategory = 'all';
let activeSubcategory = 'all';
let searchTerm = '';
let editingId = null;

let wizActiveCat = null;
let wizActiveProblem = null;
let wizActiveProblemTag = 'all';
const wizStageProblems = {open:null, wait:null, close:null};
let wizSaleType = 'post';
let sidebarMode = 'wizard';
const STAGE_ORDER = {open:0, body:1, wait:2, close:3};
const SINGLE_STAGES = new Set(['open','wait','close']);

function catLabel(id){ const c = categories.find(x=>x.id===id); return c ? c.label : (id||''); }

async function loadCategories(){
  try{
    const current = localStorage.getItem(CATEGORY_STORAGE_KEY);
    const res = current !== null ? current : localStorage.getItem('categories_v2');
    if(res !== null){
      const parsed = JSON.parse(res);
      // 空清單也是使用者刻意儲存的資料，不應在更新網頁後被預設內容覆蓋。
      if(Array.isArray(parsed)) return parsed;
    }
  }catch(e){ console.error(e); }
  await saveCategories(SEED_CATEGORIES);
  return SEED_CATEGORIES.slice();
}

async function saveCategories(list){
  categories = list;
  try{ localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(list)); }
  catch(e){ console.error('儲存類型失敗', e); }
}

async function loadTemplates(){
  try{
    const current = localStorage.getItem(STORAGE_KEY);
    const res = current !== null ? current : localStorage.getItem('templates_v2');
    if(res !== null){
      const parsed = JSON.parse(res);
      // 只在第一次使用、完全沒有資料時才載入預設話術。
      if(Array.isArray(parsed)) return parsed;
    }
  }catch(e){ console.error(e); }
  await saveTemplates(SEED_TEMPLATES);
  return SEED_TEMPLATES.slice();
}

async function saveTemplates(list){
  templates = list;
  try{ 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); 
    updateSaveBadge();
  }
  catch(e){ console.error('儲存失敗', e); showToast('儲存失敗,請稍後再試', true); }
}

function makeCustomVar(name, kind='text'){
  return {id:'cv_'+Date.now()+'_'+Math.random().toString(36).slice(2,6), name, kind, baseId:'', offsetDays:0};
}
function normalizeCustomVars(list){
  return (Array.isArray(list) ? list : []).map((item, index)=>{
    if(typeof item==='string') return {id:'legacy_'+index+'_'+encodeURIComponent(item), name:item, kind:'text', baseId:'', offsetDays:0};
    return {
      id:item.id || 'cv_'+index+'_'+Math.random().toString(36).slice(2,6),
      name:String(item.name || '').trim(),
      kind:item.kind==='date' ? 'date' : 'text',
      baseId:item.baseId || '',
      offsetDays:Number(item.offsetDays) || 0
    };
  }).filter(item=>item.name);
}
function loadCustomVars(){
  try{
    const res = localStorage.getItem(CUSTOM_VARS_KEY) || localStorage.getItem('custom_vars_v2');
    if(res) return normalizeCustomVars(JSON.parse(res));
  }catch(e){}
  return [makeCustomVar('訂單編號')];
}
function saveCustomVars(list){
  customVars = normalizeCustomVars(list);
  try{ localStorage.setItem(CUSTOM_VARS_KEY, JSON.stringify(customVars)); }catch(e){}
}
function customVarByName(name){ return customVars.find(v=>v.name===name); }
function addDaysToDate(dateValue, offset){
  if(!dateValue) return '';
  const date = new Date(dateValue+'T00:00:00');
  if(Number.isNaN(date.getTime())) return '';
  date.setDate(date.getDate()+Number(offset||0));
  return [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
}
function resolvedVarValue(name, seen=new Set()){
  const def = customVarByName(name);
  if(!def) return varsValues[name] || '';
  if(seen.has(def.id)) return '';
  if(def.kind==='date' && def.baseId){
    const base = customVars.find(v=>v.id===def.baseId);
    return base ? addDaysToDate(resolvedVarValue(base.name, new Set([...seen, def.id])), def.offsetDays) : '';
  }
  return varsValues[name] || '';
}
function replaceVariableName(oldName, newName){
  if(!oldName || !newName || oldName===newName) return;
  const replaceText = text=>String(text||'').split('{'+oldName+'}').join('{'+newName+'}');
  templates.forEach(t=>{
    t.content = replaceText(t.content);
    t.variants = (t.variants||[]).map(replaceText);
  });
  if(varsValues[oldName]!==undefined){
    varsValues[newName] = varsValues[oldName];
    delete varsValues[oldName];
  }
}

function loadEditorCode(){
  try{ return localStorage.getItem(EDITOR_CODE_VALUE_KEY) || ''; }catch(e){ return ''; }
}
function saveEditorCode(value){
  try{ localStorage.setItem(EDITOR_CODE_VALUE_KEY, value); }catch(e){}
}

function updateSaveBadge(){
  const badge = document.getElementById('saveBadge');
  if(badge) badge.title = `已有 ${templates.length} 則話術與 ${categories.length} 個分類保存於此瀏覽器中`;
}

const IMPORT_HEADER_ALIASES = {
  stage:['階段','stage','對話階段'],
  category:['大類型','類型','分類','問題類型','category'],
  subcategory:['小類型','小分類','子分類','subcategory'],
  tags:['標籤','tags','tag'],
  saletype:['售前售後','售前/售後','情境','saletype'],
  title:['標題','title','名稱'],
  content:['內容','回覆','回覆內容','第一版','預設回覆','content'],
  defaultVariantLabel:['預設按鍵名稱','預設回覆名稱','defaultVariantLabel'],
  appendWait:['附帶查詢中','加上請稍等','附帶等待話術'],
  hint:['提示','建議動作','動作','hint'],
  guidanceText:['提示文字','操作提示文字','guidanceText'],
  guidanceSteps:['操作步驟','提示步驟','guidanceSteps'],
  guidanceStepLinks:['操作步驟連結','步驟連結','guidanceStepLinks'],
  guidanceJson:['提示完整資料','guidanceJson'],
  linkLabel:['參考連結名稱','連結名稱','linkLabel'],
  link:['參考連結','連結','link','網址']
};
const VARIANT_COL_KEYWORDS = ['其他回覆', '回覆方式', '版本'];
const VARIANT_LABEL_COL_KEYWORDS = ['按鍵名稱', '版本名稱', '小標'];

function stageFromText(s){
  s = (s==null? '' : String(s)).trim();
  if(/開頭/.test(s)) return 'open';
  if(/結尾|结尾/.test(s)) return 'close';
  if(/查詢|等待|時間/.test(s)) return 'wait';
  if(/中段|回答|body/i.test(s)) return 'body';
  return null;
}
function saleTypeFromText(s){
  s = (s==null? '' : String(s)).trim();
  if(/皆可|通用|都可/.test(s)) return 'both';
  if(/售前/.test(s)) return 'pre';
  if(/售後|售后/.test(s)) return 'post';
  return null;
}
function findCol(rowKeys, aliases){
  return rowKeys.find(k => aliases.some(a => String(k).toLowerCase().includes(a.toLowerCase())));
}
function findVariantCols(rowKeys){
  return rowKeys.filter(k => {
    const name = String(k).toLowerCase();
    return VARIANT_COL_KEYWORDS.some(kw => name.includes(kw.toLowerCase()))
      && !VARIANT_LABEL_COL_KEYWORDS.some(kw => name.includes(kw.toLowerCase()));
  });
}
function findVariantLabelCol(variantCol, rowKeys){
  const suffix = String(variantCol).match(/(\d+)\s*$/)?.[1];
  return rowKeys.find(k=>{
    const name = String(k);
    const isLabel = VARIANT_LABEL_COL_KEYWORDS.some(kw=>name.toLowerCase().includes(kw.toLowerCase()));
    return isLabel && (!suffix || name.endsWith(suffix));
  });
}
function resolveCategory(text, workingCats){
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
    subcategory: findCol(keys, IMPORT_HEADER_ALIASES.subcategory),
    tags: findCol(keys, IMPORT_HEADER_ALIASES.tags),
    saletype: findCol(keys, IMPORT_HEADER_ALIASES.saletype),
    title: findCol(keys, IMPORT_HEADER_ALIASES.title),
    content: findCol(keys, IMPORT_HEADER_ALIASES.content),
    defaultVariantLabel: findCol(keys, IMPORT_HEADER_ALIASES.defaultVariantLabel),
    appendWait: findCol(keys, IMPORT_HEADER_ALIASES.appendWait),
    hint: findCol(keys, IMPORT_HEADER_ALIASES.hint),
    guidanceText: findCol(keys, IMPORT_HEADER_ALIASES.guidanceText),
    guidanceSteps: findCol(keys, IMPORT_HEADER_ALIASES.guidanceSteps),
    guidanceStepLinks: findCol(keys, IMPORT_HEADER_ALIASES.guidanceStepLinks),
    guidanceJson: findCol(keys, IMPORT_HEADER_ALIASES.guidanceJson),
    linkLabel: findCol(keys, IMPORT_HEADER_ALIASES.linkLabel),
    link: findCol(keys, IMPORT_HEADER_ALIASES.link)
  };
  const variantCols = findVariantCols(keys);
  
  if(!col.title || !col.content){
    return {error:'找不到「標題」或「回覆內容」欄位,請確認 Excel 欄位名稱,或先下載範本參考格式。'};
  }
  const workingCats = categories.map(c=>({...c}));
  const valid = []; let skipped = 0;
  
  rows.forEach((r,i)=>{
    const title = String(r[col.title] ?? '').trim();
    let content = String(r[col.content] ?? '').trim();
    const defaultVariantLabel = col.defaultVariantLabel
      ? String(r[col.defaultVariantLabel] ?? '').trim() || '預設回覆'
      : '預設回覆';
    if(!title || !content){ skipped++; return; }
    const stage = (col.stage ? stageFromText(r[col.stage]) : null) || 'body';
    let category = null;
    let subcategory = null;
    if(stage==='body'){
      const catText = col.category ? String(r[col.category] ?? '').trim() : '';
      const resolved = resolveCategory(catText, workingCats) || workingCats.find(c=>c.label==='其他') || workingCats[0];
      category = resolved ? resolved.id : null;
      subcategory = col.subcategory ? String(r[col.subcategory] ?? '').trim() || null : null;
    }
    const tags = col.tags ? String(r[col.tags] ?? '').split(/[，,、]/).map(v=>v.trim()).filter(Boolean) : [];
    let saleType = null;
    if(stage==='open' || stage==='close' || stage==='body'){
      const raw = col.saletype ? saleTypeFromText(r[col.saletype]) : null;
      saleType = raw || (stage==='body' ? 'both' : 'post');
    }
    
    let variants = [];
    let variantLabels = [];
    variantCols.forEach(vc => {
      const vText = String(r[vc] ?? '').trim();
      if(vText) {
        const splitted = vText.split(/\n?===\n?/).map(v=>v.trim()).filter(Boolean);
        const labelCol = findVariantLabelCol(vc, keys);
        const rawLabel = labelCol ? String(r[labelCol] ?? '').trim() : '';
        splitted.forEach((text, idx) => {
          variants.push(text);
          // 有「按鍵名稱／版本名稱」欄時優先使用；否則沿用回覆欄的小標。
          const label = rawLabel || String(vc);
          variantLabels.push(splitted.length > 1 ? `${label} ${idx+1}` : label);
        });
      }
    });

    const appendWaitText = col.appendWait ? String(r[col.appendWait] ?? '').trim() : '';
    const appendWait = stage==='body' && /是|Y|True|1/i.test(appendWaitText);
    
    const guidanceText = col.guidanceText ? String(r[col.guidanceText] ?? '').trim() : '';
    const stepSource = col.guidanceSteps ? String(r[col.guidanceSteps] ?? '').trim() : (col.hint ? String(r[col.hint] ?? '').trim() : '');
    const stepLinks = col.guidanceStepLinks ? String(r[col.guidanceStepLinks] ?? '').split(/\r?\n/).map(v=>v.trim()) : [];
    const linkSource = col.link ? String(r[col.link] ?? '').trim() : '';
    const linkLabels = col.linkLabel ? String(r[col.linkLabel] ?? '').split(/\r?\n/).map(v=>v.trim()) : [];
    let guidance = [];
    // 匯出檔中的完整資料會保留順序、每一步網址與所有參考連結。
    if(col.guidanceJson){
      try{
        const parsed = JSON.parse(String(r[col.guidanceJson] ?? ''));
        if(Array.isArray(parsed)) guidance = parsed.filter(item=>item && ((item.type==='step' && item.text) || (item.type==='link' && item.url)));
      }catch(e){}
    }
    if(!guidance.length){
      guidance = stepSource.split(/\r?\n/).map(text=>text.trim()).filter(Boolean).map((text, idx)=>({type:'step', text, url:stepLinks[idx] || undefined}));
      linkSource.split(/\r?\n/).map(url=>url.trim()).filter(Boolean).forEach((url, idx)=>{
        guidance.push({type:'link', label:linkLabels[idx] || '參考連結', url});
      });
    }
    const hint = (guidance.find(item=>item.type==='step')||{}).text || '';
    const link = (guidance.find(item=>item.type==='link')||{}).url || '';
    
    valid.push({
      id:'x'+Date.now()+'_'+i+Math.random().toString(36).slice(2,5), 
      stage, category, subcategory, tags, saleType, title, defaultVariantLabel, content, variants, variantLabels,
      appendWait: appendWait || undefined,
      guidanceText: guidanceText || undefined,
      guidance: guidance.length ? guidance : undefined,
      hint: hint || undefined, link: link || undefined
    });
  });
  
  const existingIds = new Set(categories.map(c=>c.id));
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
    templates = (mode==='replace') ? result.valid.slice() : [...result.valid, ...templates];
    if(result.newCategories.length){
      categories = [...categories, ...result.newCategories];
      await saveCategories(categories);
    }
    await saveTemplates(templates);
    overlay.remove();
    renderAll();
    renderCompose();
    showToast(`已成功匯入並保存 ${result.valid.length} 則話術！`);
  };
}

function templateFingerprint(t){
  return JSON.stringify([
    t.stage || '', t.category || '', t.subcategory || '', Array.isArray(t.tags) ? t.tags : [], t.saleType || '', t.title || '', t.defaultVariantLabel || '', t.content || '',
    Array.isArray(t.variants) ? t.variants : [], Array.isArray(t.variantLabels) ? t.variantLabels : [],
    Array.isArray(t.guidance) ? t.guidance : [], t.guidanceText || '', !!t.appendWait, t.hint || '', t.link || ''
  ]);
}

function uniqueImportId(existingIds){
  let id;
  do { id = 'u' + Date.now() + Math.random().toString(36).slice(2,6); }
  while(existingIds.has(id));
  return id;
}

function mergeJsonBackup(dump){
  const incomingCategories = Array.isArray(dump.categories) ? dump.categories : [];
  const incomingTemplates = Array.isArray(dump.templates) ? dump.templates : [];
  const incomingVars = Array.isArray(dump.customVars) ? dump.customVars : [];

  const nextCategories = categories.map(c=>({...c}));
  const categoryMap = {};
  incomingCategories.forEach(c=>{
    if(!c || !c.id || !c.label) return;
    const sameLabel = nextCategories.find(x=>x.label===c.label);
    const sameId = nextCategories.find(x=>x.id===c.id);
    let target = sameLabel || sameId;
    if(!target){
      const id = nextCategories.some(x=>x.id===c.id)
        ? 'c' + Date.now() + '_' + Math.random().toString(36).slice(2,5)
        : c.id;
      target = {...c, id};
      nextCategories.push(target);
    }
    categoryMap[c.id] = target.id;
  });

  const nextTemplates = templates.map(t=>({...t, variants:Array.isArray(t.variants) ? t.variants.slice() : []}));
  const known = new Set(nextTemplates.map(templateFingerprint));
  const ids = new Set(nextTemplates.map(t=>t.id));
  let added = 0, skipped = 0;

  incomingTemplates.forEach(t=>{
    if(!t || !t.title || !t.content){ skipped++; return; }
    const copy = {...t, category:categoryMap[t.category] || t.category, variants:Array.isArray(t.variants) ? t.variants.slice() : []};
    const fingerprint = templateFingerprint(copy);
    if(known.has(fingerprint)){ skipped++; return; }
    if(!copy.id || ids.has(copy.id)) copy.id = uniqueImportId(ids);
    ids.add(copy.id);
    known.add(fingerprint);
    nextTemplates.push(copy);
    added++;
  });

  categories = nextCategories;
  templates = nextTemplates;
  customVars = [...new Set([...customVars, ...incomingVars.filter(v=>typeof v==='string' && v.trim())])];
  return {added, skipped};
}

function openJsonImportConfirmModal(dump, filename){
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-head"><h3>匯入 JSON 備份</h3><button class="icon-btn" id="jsonClose">${icon('x')}</button></div>
      <div class="modal-body">
        <p class="field-hint" style="margin:0;">「${escapeHtml(filename)}」包含 ${dump.templates.length} 則話術。選擇合併可保留目前的內容。</p>
        <div class="field">
          <label>還原方式</label>
          <label style="display:flex;align-items:center;gap:8px;font-weight:500;font-size:13px;color:var(--ink);margin-bottom:8px;">
            <input type="radio" name="jsonMode" value="merge" checked style="width:auto;"> 合併備份內容（建議；相同話術不重複加入）
          </label>
          <label style="display:flex;align-items:center;gap:8px;font-weight:500;font-size:13px;color:var(--ink);">
            <input type="radio" name="jsonMode" value="replace" style="width:auto;"> 完整覆蓋目前資料
          </label>
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn btn-ghost" id="jsonCancel">取消</button>
        <button class="btn btn-primary" id="jsonConfirm">${icon('check',' style="stroke:#fff;width:13px;height:13px"')} 確認匯入</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const close = ()=>overlay.remove();
  overlay.querySelector('#jsonClose').onclick = close;
  overlay.querySelector('#jsonCancel').onclick = close;
  overlay.onclick = (e)=>{ if(e.target===overlay) close(); };
  overlay.querySelector('#jsonConfirm').onclick = async ()=>{
    const mode = overlay.querySelector('input[name=jsonMode]:checked').value;
    let message;
    if(mode==='replace'){
      templates = dump.templates.map(t=>({...t, variants:Array.isArray(t.variants) ? t.variants.slice() : []}));
      categories = Array.isArray(dump.categories) ? dump.categories.map(c=>({...c})) : [];
      customVars = Array.isArray(dump.customVars) ? dump.customVars.slice() : [];
      message = '已完整還原 JSON 備份';
    }else{
      const result = mergeJsonBackup(dump);
      message = `已合併新增 ${result.added} 則話術${result.skipped ? `，略過 ${result.skipped} 則重複或無效資料` : ''}`;
    }
    await saveTemplates(templates);
    await saveCategories(categories);
    saveCustomVars(customVars);
    close();
    renderAll();
    renderCompose();
    showToast(message);
  };
}

function exportCurrentTemplates(){
  if(typeof XLSX==='undefined'){ showToast('匯出功能載入中,請稍後再試一次', true); return; }
  if(!templates.length){ showToast('目前沒有話術可以匯出', true); return; }

  let maxVariants = 0;
  templates.forEach(t=>{ if(t.variants && t.variants.length > maxVariants) maxVariants = t.variants.length; });
  const saleTypeLabel = {pre:'售前', post:'售後', both:'皆可'};

  const rows = templates.map(t=>{
    const guidance = guidanceFor(t);
    const steps = guidance.filter(item=>item.type==='step');
    const links = guidance.filter(item=>item.type==='link');
    // 欄位順序：基本資料 → 回覆選項 → 操作提示。
    const row = {
      '階段': STAGE_LABEL_SHORT[t.stage] || t.stage,
      '大類型': t.category ? catLabel(t.category) : '',
      '售前售後': t.saleType ? (saleTypeLabel[t.saleType]||'') : '',
      '標籤': (t.tags||[]).join('、'),
      '標題': t.title,
      '預設按鍵名稱': t.defaultVariantLabel || '預設回覆',
      '回覆內容': t.content
    };
    for(let i=0; i<maxVariants; i++){
      row[`按鍵名稱${i+2}`] = (t.variantLabels && t.variantLabels[i]) || `版本 ${i+2}`;
      row[`回覆方式${i+2}`] = (t.variants && t.variants[i]) ? t.variants[i] : '';
    }
    row['提示文字'] = t.guidanceText || '';
    row['操作步驟'] = steps.map(item=>item.text).join('\n');
    row['操作步驟連結'] = steps.map(item=>item.url || '').join('\n');
    row['參考連結名稱'] = links.map(item=>item.label || '參考連結').join('\n');
    row['參考連結'] = links.map(item=>item.url).join('\n');
    row['附帶查詢中'] = t.appendWait ? '是' : '否';
    return row;
  });
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '話術清單');
  XLSX.writeFile(wb, `客服話術匯出_${new Date().toISOString().slice(0,10)}.xlsx`);
}

function downloadBlankTemplate(){
  if(typeof XLSX==='undefined'){ showToast('模板功能載入中,請稍後再試一次', true); return; }
  const headers = [
    '階段', '大類型', '售前售後', '標籤', '標題',
    '預設按鍵名稱', '回覆內容',
    '按鍵名稱2', '回覆方式2',
    '按鍵名稱3', '回覆方式3',
    '提示文字', '操作步驟', '操作步驟連結',
    '參考連結名稱', '參考連結', '附帶查詢中'
  ];
  const ws = XLSX.utils.aoa_to_sheet([headers]);
  ws['!cols'] = headers.map(name=>({wch:Math.max(14, String(name).length*2+4)}));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '話術模板');
  XLSX.writeFile(wb, '客服話術空白模板.xlsx');
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
      categories,
      customVars,
      templates
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
function extractVars(text){
  const re = /\{([^{}]+)\}/g; const out = []; let m;
  while((m = re.exec(text))){ if(!out.includes(m[1])) out.push(m[1]); }
  return out;
}
function allTemplateVariables(){
  const result = [];
  templates.forEach(t=>{
    allVariants(t).forEach(text=>extractVars(text).forEach(name=>{
      if(!result.includes(name)) result.push(name);
    }));
  });
  return result;
}
function fillPlain(text){
  return text.replace(/\{([^{}]+)\}/g, (m,p1) => (resolvedVarValue(p1) && String(resolvedVarValue(p1)).trim()) ? resolvedVarValue(p1) : m);
}
function fillHtml(text){
  const escaped = escapeHtml(text);
  return escaped.replace(/\{([^{}]+)\}/g, (m,p1) => {
    const v = resolvedVarValue(p1);
    return (v && String(v).trim()) ? escapeHtml(v) : `<mark>${escapeHtml(m)}</mark>`;
  });
}
function allVariants(t){
  return [t.content, ...(t.variants||[])].filter(v=>v!=null);
}
function variantLabel(t, variantIndex){
  if(variantIndex===0) return t.defaultVariantLabel || '預設回覆';
  return (t.variantLabels||[])[variantIndex-1] || `版本 ${variantIndex+1}`;
}
function instanceText(t, variantIndex){
  const arr = allVariants(t);
  return arr[variantIndex] ?? arr[0] ?? '';
}
function showToast(msg, warn=false){
  const wrap = document.getElementById('toast-wrap');
  const el = document.createElement('div');
  el.className = 'toast' + (warn ? ' warn' : '');
  el.innerHTML = (warn ? icon('alert') : icon('check')) + `<span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transition='opacity .25s'; setTimeout(()=>el.remove(),250); }, 2200);
}
async function copyText(text){
  try{ await navigator.clipboard.writeText(text); return true; }
  catch(e){
    try{
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
      return true;
    }catch(e2){ return false; }
  }
}

function setSidebarMode(mode){
  sidebarMode = mode;
  document.querySelectorAll('.mode-tab').forEach(b=> b.classList.toggle('active', b.dataset.mode===mode));
  document.getElementById('wizardPanel').style.display = mode==='wizard' ? 'flex' : 'none';
  document.getElementById('browsePanel').style.display = mode==='browse' ? 'flex' : 'none';
  document.getElementById('sidebarHint').textContent = mode==='wizard'
    ? '點按鈕就會依順序組進右邊的回覆'
    : '點卡片上「加入回覆」即可組合回覆';
}
function guidanceFor(t){
  if(Array.isArray(t.guidance) && t.guidance.length){
    return t.guidance.filter(item=>item && ((item.type==='step' && item.text) || (item.type==='link' && item.url)));
  }
  const legacy = [];
  if(t.hint) legacy.push({type:'step', text:t.hint});
  if(t.link) legacy.push({type:'link', label:'參考連結', url:t.link});
  return legacy;
}
function linkTag(t){
  const guidance = guidanceFor(t);
  if(!guidance.length && !t.guidanceText) return '';
  const firstStep = guidance.find(item=>item.type==='step');
  const firstLink = guidance.find(item=>item.type==='link');
  const title = firstStep ? escapeHtml(firstStep.text) : '查看操作提示';
  if(firstLink){
    return `<a class="wiz-link" href="${escapeHtml(firstLink.url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="${title}">${icon('lightbulb')}</a>`;
  }
  return `<span class="wiz-link" title="${title}">${icon('lightbulb')}</span>`;
}
function renderActionHints(){
  const box = document.getElementById('actionHints');
  const relevant = composeList
    .map(c=>templates.find(t=>t.id===c.tplId))
    .filter(t=> t && (guidanceFor(t).length || t.guidanceText));
  if(!relevant.length){ box.style.display='none'; box.innerHTML=''; return; }
  box.style.display='block';
  box.innerHTML = `<p class="filter-label" style="margin-bottom:8px;">${icon('lightbulb')} 操作提示</p>` + relevant.map(t=>{
    const actions = guidanceFor(t).map((item, i)=>{
      if(item.type==='link'){
        return `<a class="btn btn-ghost btn-sm" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">${icon('link','style="width:12px;height:12px"')} ${escapeHtml(item.label||'參考連結')}</a>`;
      }
      if(item.url){
        return `<a class="btn btn-ghost btn-sm" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">${i+1}. ${escapeHtml(item.text)} ${icon('link','style="width:12px;height:12px"')}</a>`;
      }
      return `<span class="btn btn-ghost btn-sm" style="cursor:default;">${i+1}. ${escapeHtml(item.text)}</span>`;
    }).join('');
    return `<div class="hint-card"><p class="hint-title">${escapeHtml(t.title)}</p>${t.guidanceText ? `<p class="hint-text" style="white-space:pre-wrap;">${escapeHtml(t.guidanceText)}</p>` : ''}<div style="display:flex;flex-wrap:wrap;gap:6px;">${actions}</div></div>`;
  }).join('');
}

function wizButtonsHtml(list){
  if(!list.length) return `<span class="empty-note">這個分類還沒有話術,可以到「瀏覽全部話術」新增一則</span>`;
  return list.map(t=>{
    const isActive = SINGLE_STAGES.has(t.stage) && composeList.some(c=>c.tplId===t.id);
    const variants = allVariants(t);
    const buttons = variants.map((_, i)=>`
      <button type="button" class="wiz-btn ${isActive && i===0?'active':''}" data-tpl="${t.id}" data-variant="${i}">
        ${escapeHtml(variants.length===1 ? t.title : `${t.title}｜${variantLabel(t, i)}`)}
      </button>`).join('');
    return `<div class="wiz-btn-group">${buttons}</div>`;
  }).join('');
}
function attachWizEvents(container){
  container.querySelectorAll('[data-tpl]').forEach(b=> {
    b.onclick = ()=> insertTemplate(b.dataset.tpl, parseInt(b.dataset.variant || '0'));
  });
}
function renderSimpleStage(stage, list, problemId, detailId, detailLabelId){
  const problemWrap = document.getElementById(problemId);
  const detailWrap = document.getElementById(detailId);
  const detailLabel = document.getElementById(detailLabelId);
  problemWrap.innerHTML = list.length
    ? list.map(t=>`<button type="button" class="wiz-chip ${wizStageProblems[stage]===t.id?'active':''}" data-simple-stage="${stage}" data-problem="${t.id}">${escapeHtml(t.title)}</button>`).join('')
    : '<span class="empty-note">尚未建立話術</span>';
  problemWrap.querySelectorAll('[data-simple-stage]').forEach(btn=>{
    btn.onclick=()=>{
      wizStageProblems[btn.dataset.simpleStage]=btn.dataset.problem;
      renderSimpleStage(stage, list, problemId, detailId, detailLabelId);
    };
  });
  const selected = list.find(t=>t.id===wizStageProblems[stage]);
  if(!selected){
    detailWrap.innerHTML='';
    detailLabel.style.display='none';
    return;
  }
  detailLabel.style.display='block';
  detailWrap.innerHTML = allVariants(selected).map((_, i)=>
    `<button type="button" class="wiz-btn" data-tpl="${selected.id}" data-variant="${i}">${escapeHtml(variantLabel(selected, i))}</button>`
  ).join('');
  attachWizEvents(detailWrap);
}

function renderWizard(){
  document.getElementById('saleTypePre').classList.toggle('active', wizSaleType==='pre');
  document.getElementById('saleTypePost').classList.toggle('active', wizSaleType==='post');

  const openList = templates.filter(t=>t.stage==='open' && (t.saleType||'post')===wizSaleType);
  renderSimpleStage('open', openList, 'wizOpen', 'wizOpenDetails', 'wizOpenDetailLabel');

  const catWrap = document.getElementById('wizBodyCat');
  catWrap.innerHTML = categories.map(c=>
    `<button type="button" class="wiz-chip ${wizActiveCat===c.id?'active':''}" data-cat="${c.id}"><span>${c.emoji}</span> ${escapeHtml(c.label)}</button>`
  ).join('') + `<button type="button" class="wiz-chip" id="btnManageCats">${icon('settings')} 管理類型</button>`;
  catWrap.querySelectorAll('[data-cat]').forEach(b=>{
    b.onclick = ()=>{
      wizActiveCat = (wizActiveCat===b.dataset.cat) ? null : b.dataset.cat;
      wizActiveProblem = null;
      wizActiveProblemTag = 'all';
      renderWizardBodySub();
    };
  });
  const manageBtn = document.getElementById('btnManageCats');
  if(manageBtn) manageBtn.onclick = openCategoryModal;
  renderWizardBodySub();

  const waitList = templates.filter(t=>t.stage==='wait');
  renderSimpleStage('wait', waitList, 'wizWait', 'wizWaitDetails', 'wizWaitDetailLabel');

  const closeList = templates.filter(t=>t.stage==='close' && (t.saleType||'post')===wizSaleType);
  renderSimpleStage('close', closeList, 'wizClose', 'wizCloseDetails', 'wizCloseDetailLabel');
}
function renderWizardBodySub(){
  const tagWrap = document.getElementById('wizProblemTagFilters');
  const tagLabel = document.getElementById('wizProblemTagLabel');
  const problemWrap = document.getElementById('wizSubcategory');
  const problemLabel = document.getElementById('wizSubcategoryLabel');
  const detailWrap = document.getElementById('wizBodySub');
  const detailLabel = document.getElementById('wizBodySubLabel');
  if(!wizActiveCat){
    tagWrap.innerHTML='';
    problemWrap.innerHTML='';
    detailWrap.innerHTML='';
    tagLabel.style.display='none';
    problemLabel.style.display='none';
    detailLabel.style.display='none';
    return;
  }

  const allProblems = templates.filter(t=>{
    if(t.stage!=='body' || t.category!==wizActiveCat) return false;
    const st = t.saleType || 'both';
    return st==='both' || st===wizSaleType;
  });
  const tags = [...new Set(allProblems.flatMap(t=>Array.isArray(t.tags) ? t.tags : []))];
  tagLabel.style.display = tags.length ? 'block' : 'none';
  tagWrap.innerHTML = tags.length ? ['all', ...tags].map(tag=>
    `<button type="button" class="wiz-chip ${wizActiveProblemTag===tag?'active':''}" data-problem-tag="${escapeHtml(tag)}">${tag==='all'?'全部':escapeHtml(tag)}</button>`
  ).join('') : '';
  tagWrap.querySelectorAll('[data-problem-tag]').forEach(btn=>{
    btn.onclick = ()=>{
      wizActiveProblemTag = btn.dataset.problemTag;
      wizActiveProblem = null;
      renderWizardBodySub();
    };
  });

  const problems = allProblems.filter(t=>wizActiveProblemTag==='all' || (t.tags||[]).includes(wizActiveProblemTag));
  problemLabel.style.display='block';
  problemWrap.innerHTML = problems.length
    ? problems.map(t=>`<button type="button" class="wiz-chip ${wizActiveProblem===t.id?'active':''}" data-problem="${t.id}">${escapeHtml(t.title)}</button>`).join('')
    : '<span class="empty-note">這個標籤下沒有問題，請選擇其他標籤</span>';
  problemWrap.querySelectorAll('[data-problem]').forEach(btn=>{
    btn.onclick = ()=>{
      wizActiveProblem = btn.dataset.problem;
      renderWizardBodySub();
    };
  });

  const selected = problems.find(t=>t.id===wizActiveProblem);
  if(!selected){
    detailWrap.innerHTML='';
    detailLabel.style.display='none';
    return;
  }
  const variants = allVariants(selected);
  detailLabel.style.display='block';
  detailWrap.innerHTML = variants.map((_, i)=>
    `<button type="button" class="wiz-btn" data-tpl="${selected.id}" data-variant="${i}">${escapeHtml(variantLabel(selected, i))}</button>`
  ).join('');
  attachWizEvents(detailWrap);
}
function renderStageChips(){
  const stages = ['all','open','body','wait','close'];
  const wrap = document.getElementById('stageChips');
  wrap.innerHTML = stages.map(s=>{
    const label = s==='all' ? '全部' : STAGE_LABEL_SHORT[s];
    const cls = s==='all' ? '' : 'stage-'+s;
    return `<button class="chip ${cls} ${activeStage===s?'active':''}" data-stage="${s}">${label}</button>`;
  }).join('');
  wrap.querySelectorAll('.chip').forEach(btn=>{
    btn.onclick = ()=>{ activeStage = btn.dataset.stage; activeCategory='all'; activeSubcategory='all'; renderAll(); };
  });
  document.getElementById('categoryWrap').style.display = (activeStage==='body' || activeStage==='all') ? 'block' : 'none';
}
function availableSubcategories(categoryId){
  return [...new Set(templates
    .filter(t=>t.stage==='body' && t.category===categoryId && t.subcategory)
    .map(t=>t.subcategory))];
}
function renderSubcategoryChips(){
  // 保留舊資料相容性；精靈現在採「分類 → 問題 → 細項」三層，不再顯示小類型篩選。
  activeSubcategory = 'all';
}
function renderCategoryChips(){
  const cats = ['all', ...categories.map(c=>c.id)];
  const wrap = document.getElementById('categoryChips');
  wrap.innerHTML = cats.map(c=>{
    const label = c==='all' ? '全部類型' : catLabel(c);
    return `<button class="chip ${activeCategory===c?'active':''}" data-cat="${c}">${label}</button>`;
  }).join('') + `<button class="chip" id="btnManageCats2">${icon('settings')} 管理</button>`;
  wrap.querySelectorAll('[data-cat]').forEach(btn=>{
    btn.onclick = ()=>{ activeCategory = btn.dataset.cat; activeSubcategory='all'; renderSubcategoryChips(); renderList(); };
  });
  const manageBtn2 = document.getElementById('btnManageCats2');
  if(manageBtn2) manageBtn2.onclick = openCategoryModal;
}

function filteredTemplates(){
  return templates.filter(t=>{
    if(activeStage!=='all' && t.stage!==activeStage) return false;
    if(activeStage!=='wait' && activeStage!=='open' && activeStage!=='close' && activeCategory!=='all' && t.category!==activeCategory) return false;
    if(activeSubcategory!=='all' && t.subcategory!==activeSubcategory) return false;
    if(searchTerm){
      const hay = (t.title+' '+t.content+' '+(t.variants||[]).join(' ')).toLowerCase();
      if(!hay.includes(searchTerm.toLowerCase())) return false;
    }
    return true;
  });
}
function renderList(){
  const list = filteredTemplates();
  const wrap = document.getElementById('listScroll');
  if(!list.length){
    wrap.innerHTML = `<div class="empty-hint">${icon('chat')}<br>找不到符合的話術<br>試試其他分類或關鍵字</div>`;
    return;
  }
  wrap.innerHTML = list.map(t=>{
    const badges = [`<span class="badge badge-${t.stage}">${STAGE_LABEL_SHORT[t.stage]}</span>`];
    if(t.category) badges.push(`<span class="badge badge-cat">${catLabel(t.category)}</span>`);
    if(t.subcategory) badges.push(`<span class="badge badge-cat">${escapeHtml(t.subcategory)}</span>`);
    (t.tags||[]).forEach(tag=>badges.push(`<span class="badge badge-cat">${escapeHtml(tag)}</span>`));
    if(t.appendWait) badges.push(`<span class="badge badge-appwait">附帶查詢中</span>`);
    const variantsCount = (t.variants || []).length + 1;
    if(variantsCount > 1) badges.push(`<span class="badge badge-cat">🔀 ${variantsCount} 個版本</span>`);
    
    const insertButtons = Array.from({length:variantsCount}).map((_, i)=>
      `<button class="btn btn-primary btn-sm" data-act="insert" data-variant="${i}">${icon('plus',' style="stroke:#fff;width:13px;height:13px"')} ${escapeHtml(variantsCount===1 ? '加入回覆' : variantLabel(t, i))}</button>`
    ).join('');

    return `
    <div class="tpl-card" data-id="${t.id}">
      <div class="tpl-card-top">
        <div class="tpl-badges">${badges.join('')}</div>
        <div style="display:flex;gap:4px;">
          <button class="icon-btn" data-act="edit" title="編輯">${icon('edit')}</button>
          <button class="icon-btn" data-act="del" title="刪除">${icon('trash')}</button>
        </div>
      </div>
      <p class="tpl-title">${escapeHtml(t.title)} ${linkTag(t)}</p>
      <p class="tpl-preview">${escapeHtml(t.content)}</p>
      <div class="tpl-actions">
        ${insertButtons}
      </div>
    </div>`;
  }).join('');

  wrap.querySelectorAll('.tpl-card').forEach(card=>{
    const id = card.dataset.id;
    card.querySelectorAll('[data-act=insert]').forEach(btn=>{
      btn.onclick = ()=> insertTemplate(id, parseInt(btn.dataset.variant || '0'));
    });
    card.querySelector('[data-act=edit]').onclick = ()=> openModal(id);
    card.querySelector('[data-act=del]').onclick = ()=> deleteTemplate(id);
  });
}

function genInstId(){ return 'i'+Date.now()+Math.random().toString(36).slice(2,6); }

function insertTemplate(tplId, variantIndex = 0, autoAppended = false){
  const t = templates.find(x=>x.id===tplId);
  if(!t) return;
  if(SINGLE_STAGES.has(t.stage)){
    composeList = composeList.filter(c=>{
      const ct = templates.find(x=>x.id===c.tplId);
      return !(ct && ct.stage===t.stage);
    });
  }
  let idx = composeList.length;
  for(let i=0;i<composeList.length;i++){
    const ct = templates.find(x=>x.id===composeList[i].tplId);
    if(ct && STAGE_ORDER[ct.stage] > STAGE_ORDER[t.stage]){ idx = i; break; }
  }
  composeList.splice(idx, 0, {instId:genInstId(), tplId, variantIndex});
  
  if(!autoAppended && t.stage === 'body' && t.appendWait) {
    const hasWait = composeList.some(c => templates.find(x => x.id === c.tplId)?.stage === 'wait');
    if (!hasWait) {
      const waitTpl = templates.find(x => x.stage === 'wait'); 
      if (waitTpl) {
        insertTemplate(waitTpl.id, 0, true);
        showToast('已加入並自動附帶查詢中話術');
      }
    } else {
      showToast('已加入回覆 (已有查詢中話術)');
    }
  } else if(!autoAppended) {
    showToast('已加入回覆');
  }

  renderCompose();
  renderWizard();
}
function removeInst(instId){ composeList = composeList.filter(c=>c.instId!==instId); renderCompose(); renderWizard(); }
function moveInst(instId, dir){
  const idx = composeList.findIndex(c=>c.instId===instId);
  const newIdx = idx+dir;
  if(newIdx<0 || newIdx>=composeList.length) return;
  [composeList[idx], composeList[newIdx]] = [composeList[newIdx], composeList[idx]];
  renderCompose();
}
function setVariant(instId, variantIndex){
  const c = composeList.find(x=>x.instId===instId);
  if(!c) return;
  c.variantIndex = variantIndex;
  renderBubblesOnly();
}

function currentVars(){
  const all = [];
  composeList.forEach(c=>{
    const t = templates.find(x=>x.id===c.tplId);
    if(t) extractVars(instanceText(t, c.variantIndex||0)).forEach(v=>{ if(!all.includes(v)) all.push(v); });
  });
  return all;
}

function renderVarBar(){
  const activeNames = new Set(currentVars());
  const fixedNames = new Set(['訂單編號', EDITOR_CODE_VAR]);
  // 日期衍生變數被使用時，基準日期也必須顯示，才能完成自動計算。
  let changed = true;
  while(changed){
    changed = false;
    customVars.forEach(def=>{
      if(activeNames.has(def.name) && def.kind==='date' && def.baseId){
        const base = customVars.find(v=>v.id===def.baseId);
        if(base && !activeNames.has(base.name)){ activeNames.add(base.name); changed=true; }
      }
    });
  }
  const definitions = [
    ...customVars.filter(def=>fixedNames.has(def.name) || activeNames.has(def.name)),
    ...[...activeNames].filter(name=>!customVarByName(name)).map(name=>({id:'auto_'+name, name, kind:'text', baseId:'', offsetDays:0, auto:true}))
  ];
  const bar = document.getElementById('varBar');

  if(!definitions.length){ bar.classList.add('is-empty'); bar.innerHTML=''; return; }
  bar.classList.remove('is-empty');
  bar.innerHTML = `<span class="var-bar-label">填入變數</span>` + definitions.map(def=>{
    const derived = def.kind==='date' && def.baseId;
    const value = resolvedVarValue(def.name);
    return `<div class="var-field">
      <label>${escapeHtml(def.name)}${def.kind==='date'?'（日期）':''}${derived?'（自動計算）':''}</label>
      <input type="${def.kind==='date'?'date':'text'}" data-var="${escapeHtml(def.name)}" value="${escapeHtml(value)}" ${derived?'readonly':''} placeholder="${def.kind==='date'?'選擇日期':'輸入內容'}">
    </div>`;
  }).join('');

  bar.querySelectorAll('input').forEach(inp=>{
    if(inp.readOnly) return;
    inp.oninput = ()=>{
      varsValues[inp.dataset.var] = inp.value;
      if(inp.dataset.var===EDITOR_CODE_VAR) saveEditorCode(inp.value);
      syncVarInputs();
    };
  });
}
function syncVarInputs(){
  document.querySelectorAll('[data-var]').forEach(inp=>{
    const v = resolvedVarValue(inp.dataset.var);
    if(inp.value !== v) inp.value = v;
  });
  renderBubblesOnly();
}

function renderCompose(){
  renderVarBar();
  renderActionHints();
  const area = document.getElementById('composeArea');
  const actions = document.getElementById('composeActions');
  if(!composeList.length){
    area.innerHTML = `<div class="compose-empty">${icon('chat')}<p>從左側點選「加入回覆」<br>開始組合給客人的訊息</p></div>`;
    actions.style.display='none';
    return;
  }
  actions.style.display='flex';
  area.innerHTML = composeList.map(c=>{
    const t = templates.find(x=>x.id===c.tplId);
    if(!t) return '';
    const variants = allVariants(t);
    const vi = c.variantIndex || 0;
    
    let variantSel = '';
    if(variants.length > 1){
      const opts = variants.map((_, i) => `<option value="${i}" ${i===vi?'selected':''}>${escapeHtml(variantLabel(t, i))}</option>`).join('');
      variantSel = `<select data-act="change-variant" data-inst="${c.instId}">${opts}</select>`;
    }
    
    return `
    <div class="bubble-row" data-inst="${c.instId}">
      <div class="avatar">${icon('store')}</div>
      <div class="bubble-col">
        <div class="bubble-meta">
          <span class="bubble-name">小幫手</span>
          <span class="bubble-stage-tag">${STAGE_LABEL_SHORT[t.stage]}${t.category? ' · '+catLabel(t.category):''}${t.subcategory? ' · '+t.subcategory:''}${variants.length>1? ` · 版本 ${vi+1}/${variants.length}`:''}</span>
        </div>
        <div class="bubble-box" data-content>${fillHtml(instanceText(t, vi))}</div>
        <div class="bubble-toolbar">
          <button data-act="up" title="上移">${icon('up')}</button>
          <button data-act="down" title="下移">${icon('down')}</button>
          ${variantSel}
          <button data-act="copy">${icon('copy')}複製這段</button>
          <button data-act="del" class="danger">${icon('x')}移除</button>
        </div>
      </div>
    </div>`;
  }).join('');

  area.querySelectorAll('.bubble-row').forEach(row=>{
    const instId = row.dataset.inst;
    row.querySelector('[data-act=up]').onclick = ()=> moveInst(instId,-1);
    row.querySelector('[data-act=down]').onclick = ()=> moveInst(instId,1);
    row.querySelector('[data-act=del]').onclick = ()=> removeInst(instId);
    
    const sel = row.querySelector('[data-act=change-variant]');
    if(sel) sel.onchange = (e)=> setVariant(instId, parseInt(e.target.value));
    
    row.querySelector('[data-act=copy]').onclick = async ()=>{
      const c = composeList.find(x=>x.instId===instId);
      const t = templates.find(x=>x.id===c.tplId);
      const text = instanceText(t, c.variantIndex||0);
      const plain = fillPlain(text);
      const hasEmpty = extractVars(text).some(v=>!(resolvedVarValue(v)&&String(resolvedVarValue(v)).trim()));
      const ok = await copyText(plain);
      if(ok) showToast(hasEmpty ? '已複製,但還有變數未填喔' : '已複製這段', hasEmpty);
      else showToast('複製失敗,請手動選取', true);
    };
  });
}
function renderBubblesOnly(){
  document.querySelectorAll('.bubble-row').forEach(row=>{
    const instId = row.dataset.inst;
    const c = composeList.find(x=>x.instId===instId);
    const t = templates.find(x=>x.id===c.tplId);
    row.querySelector('[data-content]').innerHTML = fillHtml(instanceText(t, c.variantIndex||0));
    const variants = allVariants(t);
    const tag = row.querySelector('.bubble-stage-tag');
    if(tag) tag.textContent = `${STAGE_LABEL_SHORT[t.stage]}${t.category? ' · '+catLabel(t.category):''}${t.subcategory? ' · '+t.subcategory:''}${variants.length>1? ` · 版本 ${(c.variantIndex||0)+1}/${variants.length}`:''}`;
  });
}

function openModal(id=null){
  editingId = id;
  const t = id ? templates.find(x=>x.id===id) : {stage:'body',category:(categories[0]||{}).id||null,subcategory:'',tags:[],saleType:'both',title:'',defaultVariantLabel:'預設回覆',content:'',variants:[], appendWait:false};
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-head">
        <h3>${id?'編輯話術':'新增話術'}</h3>
        <button class="icon-btn" id="mClose">${icon('x')}</button>
      </div>
      <div class="modal-body">
        <div class="field-row">
          <div class="field">
            <label>對話階段</label>
            <select id="mStage">
              ${Object.entries(STAGE_LABEL).map(([k,v])=>`<option value="${k}" ${t.stage===k?'selected':''}>${v}</option>`).join('')}
            </select>
          </div>
          <div class="field" id="mCatWrap" style="display:${t.stage==='body'?'block':'none'}">
            <label>問題類型</label>
            <select id="mCategory">
              ${categories.map(c=>`<option value="${c.id}" ${t.category===c.id?'selected':''}>${escapeHtml(c.label)}</option>`).join('')}
            </select>
          </div>
          <div class="field" id="mTagsWrap" style="display:${t.stage==='body'?'block':'none'}">
            <label>標籤（選填）</label>
            <input type="text" id="mTags" value="${escapeHtml((t.tags||[]).join('、'))}" placeholder="例如：急件、物流追蹤；以逗號分隔">
          </div>
          <div class="field" id="mSaleWrap" style="display:${(t.stage==='open'||t.stage==='close'||t.stage==='body')?'block':'none'}">
            <label>售前/售後</label>
            <select id="mSaleType">
              <option value="pre" ${t.saleType==='pre'?'selected':''}>售前諮詢</option>
              <option value="post" ${t.saleType==='post'?'selected':''}>售後處理</option>
              <option value="both" ${(!t.saleType || t.saleType==='both')?'selected':''}>皆可適用</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label>標題</label>
          <input type="text" id="mTitle" value="${escapeHtml(t.title||'')}" placeholder="例如:包裹物流查詢中">
        </div>
        <div class="field" id="mAppendWaitWrap" style="display:${t.stage==='body'?'block':'none'}">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none;">
            <input type="checkbox" id="mAppendWait" style="width:auto;" ${t.appendWait?'checked':''}>
            加入時自動附帶「查詢中請稍等」的等待話術
          </label>
        </div>
        <div class="field">
          <label>預設回覆的按鍵名稱</label>
          <input type="text" id="mDefaultVariantLabel" value="${escapeHtml(t.defaultVariantLabel||'預設回覆')}" placeholder="例如：基本說明">
          <p class="field-hint">這是最後一層「細項」顯示的按鍵名稱。</p>
        </div>
        <div class="field">
          <label>回覆內容 (預設版本)</label>
          <textarea id="mContent" placeholder="輸入話術內容…">${escapeHtml(t.content||'')}</textarea>
          <p class="field-hint">用 {變數名稱} 標記需要填空的地方,例如 {訂單編號}、{物流狀態},複製前會出現輸入框讓你填寫。</p>
        </div>
        <div class="field">
          <label>其他版本回覆方式 (選填)</label>
          <div id="mVariantList" style="display:flex;flex-direction:column;gap:8px;"></div>
          <button type="button" class="btn btn-ghost btn-sm" id="mAddVariant" style="margin-top:8px;">${icon('plus',' style="width:12px;height:12px"')} 新增一個版本</button>
          <p class="field-hint">加入回覆時可以在這些版本之間指定或切換。</p>
        </div>
        <div class="field">
          <label>操作提示（選填）</label>
          <textarea id="mGuidanceIntro" placeholder="輸入要先顯示的純文字提示…">${escapeHtml(t.guidanceText||'')}</textarea>
          <p class="field-hint">這段文字會顯示在步驟與連結按鍵前方。</p>
          <div id="mGuidanceList" style="display:flex;flex-direction:column;gap:8px;"></div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
            <button type="button" class="btn btn-ghost btn-sm" id="mAddStep">${icon('plus',' style="width:12px;height:12px"')} 新增步驟</button>
            <button type="button" class="btn btn-ghost btn-sm" id="mAddLink">${icon('link',' style="width:12px;height:12px"')} 新增參考連結</button>
          </div>
          <p class="field-hint">步驟會依序顯示成提示按鍵；參考連結可直接開啟需要查詢的網站。</p>
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn btn-ghost" id="mCancel">取消</button>
        <button class="btn btn-primary" id="mSave">${icon('check',' style="stroke:#fff;width:13px;height:13px"')} 儲存</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const stageSel = overlay.querySelector('#mStage');
  const catWrap = overlay.querySelector('#mCatWrap');
  const tagsWrap = overlay.querySelector('#mTagsWrap');
  const saleWrap = overlay.querySelector('#mSaleWrap');
  const waitWrap = overlay.querySelector('#mAppendWaitWrap');
  stageSel.onchange = ()=>{
    catWrap.style.display = stageSel.value==='body' ? 'block':'none';
    tagsWrap.style.display = stageSel.value==='body' ? 'block':'none';
    saleWrap.style.display = (stageSel.value==='open'||stageSel.value==='close'||stageSel.value==='body') ? 'block':'none';
    waitWrap.style.display = stageSel.value==='body' ? 'block':'none';
  };

  let variantDrafts = (t.variants || []).map((content, i)=>({
    label:(t.variantLabels || [])[i] || `版本 ${i+2}`,
    content
  }));
  function readVariantDrafts(){
    overlay.querySelectorAll('.mVariantInput').forEach(ta=>{ variantDrafts[Number(ta.dataset.idx)].content = ta.value; });
    overlay.querySelectorAll('.mVariantLabel').forEach(inp=>{ variantDrafts[Number(inp.dataset.idx)].label = inp.value; });
  }
  function renderVariantList(){
    const wrap = overlay.querySelector('#mVariantList');
    if(!variantDrafts.length){ wrap.innerHTML = ''; return; }
    wrap.innerHTML = variantDrafts.map((v,i)=>`
      <div style="display:flex;gap:6px;align-items:flex-start;">
        <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
          <input class="mVariantLabel" data-idx="${i}" value="${escapeHtml(v.label)}" placeholder="按鍵名稱，例如：商品標題">
          <textarea class="mVariantInput" data-idx="${i}" placeholder="此按鍵對應的回覆內容" style="min-height:70px;border:1px solid var(--line);border-radius:10px;padding:8px 10px;font-size:13px;line-height:1.6;outline:none;">${escapeHtml(v.content)}</textarea>
        </div>
        <button type="button" class="icon-btn" data-rmv="${i}" title="刪除這個版本">${icon('trash')}</button>
      </div>`).join('');
    wrap.querySelectorAll('[data-rmv]').forEach(btn=>{
      btn.onclick = ()=>{
        readVariantDrafts();
        variantDrafts.splice(Number(btn.dataset.rmv), 1);
        renderVariantList();
      };
    });
  }
  renderVariantList();
  overlay.querySelector('#mAddVariant').onclick = ()=>{
    readVariantDrafts();
    variantDrafts.push({label:`版本 ${variantDrafts.length+2}`, content:''});
    renderVariantList();
  };

  let guidanceDrafts = guidanceFor(t).map(item=>({...item}));
  function readGuidanceDrafts(){
    overlay.querySelectorAll('.mGuidanceText').forEach(inp=>{ guidanceDrafts[Number(inp.dataset.idx)].text = inp.value; });
    overlay.querySelectorAll('.mGuidanceStepUrl').forEach(inp=>{ guidanceDrafts[Number(inp.dataset.idx)].url = inp.value; });
    overlay.querySelectorAll('.mGuidanceLabel').forEach(inp=>{ guidanceDrafts[Number(inp.dataset.idx)].label = inp.value; });
    overlay.querySelectorAll('.mGuidanceUrl').forEach(inp=>{ guidanceDrafts[Number(inp.dataset.idx)].url = inp.value; });
  }
  function renderGuidanceList(){
    const wrap = overlay.querySelector('#mGuidanceList');
    if(!guidanceDrafts.length){ wrap.innerHTML='<span class="field-hint">尚未新增提示步驟或參考連結</span>'; return; }
    wrap.innerHTML = guidanceDrafts.map((item,i)=>{
      if(item.type==='link'){
        return `<div style="display:flex;gap:6px;align-items:flex-start;"><div style="flex:1;display:flex;flex-direction:column;gap:6px;"><input class="mGuidanceLabel" data-idx="${i}" value="${escapeHtml(item.label||'參考連結')}" placeholder="連結按鍵名稱"><input class="mGuidanceUrl" data-idx="${i}" value="${escapeHtml(item.url||'')}" placeholder="https://..."></div><button type="button" class="icon-btn" data-remove-guidance="${i}" title="刪除">${icon('trash')}</button></div>`;
      }
      return `<div style="display:flex;gap:6px;align-items:flex-start;"><div style="flex:1;display:flex;flex-direction:column;gap:6px;"><input class="mGuidanceText" data-idx="${i}" value="${escapeHtml(item.text||'')}" placeholder="步驟說明，例如：開啟後台訂單頁面查詢"><input class="mGuidanceStepUrl" data-idx="${i}" value="${escapeHtml(item.url||'')}" placeholder="此步驟的網址（選填，https://...）"></div><button type="button" class="icon-btn" data-remove-guidance="${i}" title="刪除">${icon('trash')}</button></div>`;
    }).join('');
    wrap.querySelectorAll('[data-remove-guidance]').forEach(btn=>btn.onclick=()=>{
      readGuidanceDrafts();
      guidanceDrafts.splice(Number(btn.dataset.removeGuidance),1);
      renderGuidanceList();
    });
  }
  renderGuidanceList();
  overlay.querySelector('#mAddStep').onclick = ()=>{
    readGuidanceDrafts();
    guidanceDrafts.push({type:'step',text:'',url:''});
    renderGuidanceList();
  };
  overlay.querySelector('#mAddLink').onclick = ()=>{
    readGuidanceDrafts();
    guidanceDrafts.push({type:'link',label:'參考連結',url:''});
    renderGuidanceList();
  };

  overlay.querySelector('#mClose').onclick = ()=>overlay.remove();
  overlay.querySelector('#mCancel').onclick = ()=>overlay.remove();
  overlay.onclick = (e)=>{ if(e.target===overlay) overlay.remove(); };

  overlay.querySelector('#mSave').onclick = async ()=>{
    const stage = overlay.querySelector('#mStage').value;
    const category = stage==='body' ? overlay.querySelector('#mCategory').value : null;
    const tags = stage==='body' ? overlay.querySelector('#mTags').value.split(/[，,、]/).map(v=>v.trim()).filter(Boolean) : [];
    // 舊匯入資料若已有小類型欄位則保留，但不再把它當成精靈的分類層級。
    const subcategory = stage==='body' ? (t.subcategory || null) : null;
    const saleType = (stage==='open'||stage==='close'||stage==='body') ? overlay.querySelector('#mSaleType').value : null;
    const appendWait = stage==='body' ? overlay.querySelector('#mAppendWait').checked : false;
    const title = overlay.querySelector('#mTitle').value.trim();
    const content = overlay.querySelector('#mContent').value.trim();
    const defaultVariantLabel = overlay.querySelector('#mDefaultVariantLabel').value.trim() || '預設回覆';
    readVariantDrafts();
    const keptVariants = variantDrafts.filter(v=>v.content.trim());
    const variants = keptVariants.map(v=>v.content.trim());
    const variantLabels = keptVariants.map((v,i)=>v.label.trim() || `版本 ${i+2}`);
    const guidanceText = overlay.querySelector('#mGuidanceIntro').value.trim() || undefined;
    readGuidanceDrafts();
    const guidance = guidanceDrafts.filter(item=>
      item.type==='link' ? String(item.url||'').trim() : String(item.text||'').trim()
    ).map(item=>item.type==='link'
      ? {type:'link', label:String(item.label||'參考連結').trim() || '參考連結', url:String(item.url).trim()}
      : {type:'step', text:String(item.text).trim(), url:String(item.url||'').trim() || undefined}
    );
    // 同時寫回舊欄位，讓舊備份與舊資料仍能正常顯示。
    const hint = (guidance.find(item=>item.type==='step')||{}).text || undefined;
    const link = (guidance.find(item=>item.type==='link')||{}).url || undefined;
    
    if(!title || !content){ showToast('請填寫標題與內容', true); return; }
    if(id){
      const idx = templates.findIndex(x=>x.id===id);
      templates[idx] = {...templates[idx], stage, category, subcategory, tags, saleType, title, defaultVariantLabel, content, variants, variantLabels, guidanceText, guidance, appendWait, hint, link};
    }else{
      templates.unshift({id:'u'+Date.now(), stage, category, subcategory, tags, saleType, title, defaultVariantLabel, content, variants, variantLabels, guidanceText, guidance, appendWait, hint, link});
    }
    await saveTemplates(templates);
    overlay.remove();
    renderAll();
    renderCompose();
    showToast(id?'已更新並儲存話術':'已新增並儲存話術');
  };
}

function openCategoryModal(){
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-head"><h3>管理問題類型</h3><button class="icon-btn" id="ctClose">${icon('x')}</button></div>
      <div class="modal-body">
        <div id="ctList" style="display:flex;flex-direction:column;gap:8px;"></div>
        <div class="field-row" style="margin-top:6px;">
          <div class="field" style="flex:0 0 64px;">
            <label>圖示</label>
            <input type="text" id="ctEmoji" value="🏷️" maxlength="4">
          </div>
          <div class="field">
            <label>新增類型名稱</label>
            <input type="text" id="ctNewLabel" placeholder="例如:發票/收據">
          </div>
        </div>
        <button class="btn btn-ghost btn-sm" id="ctAdd" style="align-self:flex-start;">${icon('plus',' style="width:13px;height:13px"')} 新增類型</button>
      </div>
      <div class="modal-foot">
        <button class="btn btn-primary" id="ctDone">完成</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  function renderCtList(){
    const listEl = overlay.querySelector('#ctList');
    listEl.innerHTML = categories.map(c=>{
      const count = templates.filter(t=>t.stage==='body' && t.category===c.id).length;
      return `
      <div style="display:flex;align-items:center;gap:6px;border:1px solid var(--line);border-radius:9px;padding:8px 10px;">
        <span style="font-size:15px;">${c.emoji}</span>
        <span style="flex:1;font-size:13px;font-weight:700;">${escapeHtml(c.label)}</span>
        <span style="font-size:11px;color:var(--ink-faint);">${count} 則話術</span>
        <button type="button" class="icon-btn" data-up="${c.id}" title="上移">${icon('up')}</button>
        <button type="button" class="icon-btn" data-down="${c.id}" title="下移">${icon('down')}</button>
        <button type="button" class="icon-btn" data-del="${c.id}" title="刪除">${icon('trash')}</button>
      </div>`;
    }).join('');
    listEl.querySelectorAll('[data-del]').forEach(btn=>{ btn.onclick = ()=> deleteCategory(btn.dataset.del, renderCtList); });
    listEl.querySelectorAll('[data-up]').forEach(btn=>{ btn.onclick = ()=> moveCategory(btn.dataset.up, -1, renderCtList); });
    listEl.querySelectorAll('[data-down]').forEach(btn=>{ btn.onclick = ()=> moveCategory(btn.dataset.down, 1, renderCtList); });
  }
  renderCtList();

  overlay.querySelector('#ctAdd').onclick = ()=>{
    const label = overlay.querySelector('#ctNewLabel').value.trim();
    const emoji = overlay.querySelector('#ctEmoji').value.trim() || '🏷️';
    if(!label){ showToast('請輸入類型名稱', true); return; }
    if(categories.some(c=>c.label===label)){ showToast('已經有這個類型了', true); return; }
    categories = [...categories, {id:'c'+Date.now()+Math.random().toString(36).slice(2,5), label, emoji}];
    saveCategories(categories);
    overlay.querySelector('#ctNewLabel').value = '';
    renderCtList();
    renderAll();
    showToast('已新增類型');
  };
  overlay.querySelector('#ctClose').onclick = ()=>{ overlay.remove(); renderAll(); };
  overlay.querySelector('#ctDone').onclick = ()=>{ overlay.remove(); renderAll(); };
  overlay.onclick = (e)=>{ if(e.target===overlay){ overlay.remove(); renderAll(); } };
}

function moveCategory(catId, dir, after){
  const idx = categories.findIndex(c=>c.id===catId);
  const newIdx = idx + dir;
  if(idx<0 || newIdx<0 || newIdx>=categories.length) return;
  categories = categories.slice();
  [categories[idx], categories[newIdx]] = [categories[newIdx], categories[idx]];
  saveCategories(categories);
  if(after) after();
  renderAll();
}
function deleteCategory(catId, afterDelete){
  if(categories.length<=1){ showToast('至少要保留一個問題類型', true); return; }
  const cat = categories.find(c=>c.id===catId);
  if(!cat) return;
  const affected = templates.filter(t=>t.stage==='body' && t.category===catId).length;
  const msg = affected
    ? `刪除「${cat.label}」會把底下 ${affected} 則中段話術移到其他類型,要繼續嗎?`
    : `確定要刪除「${cat.label}」這個類型嗎?`;
  
  customConfirm(msg, () => {
    categories = categories.filter(c=>c.id!==catId);
    const fallback = categories.find(c=>c.label==='其他') || categories[0];
    templates.forEach(t=>{ if(t.stage==='body' && t.category===catId) t.category = fallback.id; });
    saveCategories(categories);
    saveTemplates(templates);
    if(wizActiveCat===catId) wizActiveCat = null;
    if(activeCategory===catId) activeCategory = 'all';
    if(afterDelete) afterDelete();
    renderAll();
    renderCompose();
    showToast('已刪除類型');
  });
}

function openVarsModal(){
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" style="max-width:520px;">
      <div class="modal-head"><h3>管理現有參數</h3><button class="icon-btn" id="cvClose">${icon('x')}</button></div>
      <div class="modal-body">
        <p class="field-hint" style="margin-top:0;">可設定純文字或日期。日期參數可選擇基準日期並自動加減天數，例如「鑑賞期截止日＝取貨日期＋7 天」。</p>
        <div id="cvList" style="display:flex;flex-direction:column;gap:10px;"></div>
        <button class="btn btn-ghost btn-sm" id="cvAdd">${icon('plus',' style="width:12px;height:12px"')} 新增參數</button>
      </div>
      <div class="modal-foot">
        <button class="btn btn-ghost" id="cvCancel">取消</button>
        <button class="btn btn-primary" id="cvDone">儲存</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const discoveredNames = allTemplateVariables();
  let draft = customVars.map(v=>({...v}));
  discoveredNames.forEach(name=>{
    if(!draft.some(v=>v.name===name)) draft.push(makeCustomVar(name));
  });

  function readDraft(){
    overlay.querySelectorAll('[data-cv-name]').forEach(inp=>{ const v=draft.find(x=>x.id===inp.dataset.cvName); if(v) v.name=inp.value.trim(); });
    overlay.querySelectorAll('[data-cv-kind]').forEach(sel=>{ const v=draft.find(x=>x.id===sel.dataset.cvKind); if(v) v.kind=sel.value; });
    overlay.querySelectorAll('[data-cv-base]').forEach(sel=>{ const v=draft.find(x=>x.id===sel.dataset.cvBase); if(v) v.baseId=sel.value; });
    overlay.querySelectorAll('[data-cv-offset]').forEach(inp=>{ const v=draft.find(x=>x.id===inp.dataset.cvOffset); if(v) v.offsetDays=Number(inp.value)||0; });
  }
  function renderDraft(){
    const list = overlay.querySelector('#cvList');
    if(!draft.length){ list.innerHTML='<span class="field-hint">尚未新增常設參數</span>'; return; }
    list.innerHTML = draft.map(v=>{
      const baseOptions = draft.filter(x=>x.id!==v.id && x.kind==='date').map(x=>`<option value="${x.id}" ${v.baseId===x.id?'selected':''}>${escapeHtml(x.name)}</option>`).join('');
      const detected = discoveredNames.includes(v.name);
      return `<div style="border:1px solid var(--line);border-radius:10px;padding:10px;display:flex;gap:8px;align-items:flex-start;">
        <div style="flex:1;display:grid;grid-template-columns:1fr 110px;gap:8px;">
          <div style="grid-column:1/-1;display:flex;align-items:center;gap:6px;"><span style="font-size:11px;color:var(--ink-faint);">${detected?'話術中已使用':'常設參數'}</span></div>
          <input data-cv-name="${v.id}" value="${escapeHtml(v.name)}" placeholder="參數名稱">
          <select data-cv-kind="${v.id}"><option value="text" ${v.kind==='text'?'selected':''}>純文字</option><option value="date" ${v.kind==='date'?'selected':''}>日期</option></select>
          ${v.kind==='date'? `<select data-cv-base="${v.id}"><option value="">手動輸入日期</option>${baseOptions}</select><input type="number" data-cv-offset="${v.id}" value="${v.offsetDays||0}" placeholder="+ N 天" title="相對基準日期的天數"></input>` : ''}
        </div>
        <button type="button" class="icon-btn" data-cv-delete="${v.id}" title="刪除">${icon('trash')}</button>
      </div>`;
    }).join('');
    list.querySelectorAll('[data-cv-kind]').forEach(sel=>sel.onchange=()=>{ readDraft(); renderDraft(); });
    list.querySelectorAll('[data-cv-delete]').forEach(btn=>btn.onclick=()=>{ readDraft(); draft=draft.filter(v=>v.id!==btn.dataset.cvDelete); draft.forEach(v=>{if(v.baseId===btn.dataset.cvDelete)v.baseId='';}); renderDraft(); });
  }
  renderDraft();

  overlay.querySelector('#cvAdd').onclick=()=>{ readDraft(); draft.push(makeCustomVar('')); renderDraft(); };
  const close=()=>overlay.remove();
  overlay.querySelector('#cvClose').onclick=close;
  overlay.querySelector('#cvCancel').onclick=close;
  overlay.onclick=e=>{if(e.target===overlay)close();};
  overlay.querySelector('#cvDone').onclick=async()=>{
    readDraft();
    if(draft.some(v=>!v.name)){ showToast('請填寫所有參數名稱', true); return; }
    draft=normalizeCustomVars(draft);
    if(!draft.length){ showToast('至少保留一個常設參數', true); return; }
    if(new Set(draft.map(v=>v.name)).size!==draft.length){ showToast('參數名稱不可重複', true); return; }
    customVars.forEach(oldVar=>{ const next=draft.find(v=>v.id===oldVar.id); if(next) replaceVariableName(oldVar.name,next.name); });
    customVars=draft;
    saveCustomVars(customVars);
    await saveTemplates(templates);
    renderVarBar();
    renderCompose();
    close();
    showToast('已儲存常設參數設定');
  };
}

function deleteTemplate(id){
  customConfirm('確定要刪除這則話術嗎？', () => {
    templates = templates.filter(t => t.id !== id);
    saveTemplates(templates);
    composeList = composeList.filter(c => c.tplId !== id);
    renderAll();
    renderCompose();
    showToast('已刪除話術');
  });
}

function renderAll(){
  renderStageChips();
  renderCategoryChips();
  renderSubcategoryChips();
  renderList();
  renderWizard();
  document.getElementById('statCount').textContent = templates.length;
  updateSaveBadge();
}

async function init(){
  customVars = loadCustomVars();
  if(!customVars.some(v=>v.name===EDITOR_CODE_VAR)){
    customVars.push(makeCustomVar(EDITOR_CODE_VAR));
    saveCustomVars(customVars);
  }
  varsValues[EDITOR_CODE_VAR] = loadEditorCode();
  categories = await loadCategories();
  templates = await loadTemplates();
  
  document.getElementById('btnExport').onclick = exportCurrentTemplates;
  document.getElementById('btnTemplate').onclick = downloadBlankTemplate;
  document.getElementById('btnBackupModal').onclick = openJsonBackupModal;
  
  const fileInp = document.getElementById('fileImport');
  document.getElementById('btnImport').onclick = ()=> fileInp.click();
  fileInp.onchange = (e)=>{
    const file = e.target.files[0];
    if(!file) return;

    if(file.name.toLowerCase().endsWith('.json')){
      const reader = new FileReader();
      reader.onload = (re)=>{
        try{
          const dump = JSON.parse(re.target.result);
          if(dump.templates && Array.isArray(dump.templates)){
            openJsonImportConfirmModal(dump, file.name);
          } else {
            showToast('JSON 格式不正確', true);
          }
        }catch(err){
          showToast('讀取 JSON 檔案失敗', true);
        }
      };
      reader.readAsText(file);
      fileInp.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (re)=>{
      try{
        const data = new Uint8Array(re.target.result);
        const wb = XLSX.read(data, {type:'array'});
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws);
        if(!rows.length) throw new Error('檔案是空的');
        const result = importFromRows(rows);
        if(result.error) showToast(result.error, true);
        else openImportConfirmModal(result, file.name);
      }catch(err){
        console.error(err);
        showToast('讀取 Excel 失敗,請確認格式', true);
      }
      fileInp.value = '';
    };
    reader.readAsArrayBuffer(file);
  };

  document.getElementById('btnAdd').onclick = ()=> openModal();
  
  document.getElementById('btnReset').onclick = ()=>{
    customConfirm('確定要還原為預設話術嗎？這會清除您所有的自訂內容與匯入資料。', async () => {
      await saveTemplates(SEED_TEMPLATES);
      await saveCategories(SEED_CATEGORIES);
      templates = SEED_TEMPLATES.slice();
      categories = SEED_CATEGORIES.slice();
      composeList = [];
      renderAll();
      renderCompose();
      showToast('已還原為預設話術');
    });
  };

  document.getElementById('btnClear').onclick = ()=>{
    composeList = []; renderCompose(); renderWizard();
  };
  
  document.getElementById('btnCopyAll').onclick = async ()=>{
    if(!composeList.length) return;
    let fullText = composeList.map(c=>{
      const t = templates.find(x=>x.id===c.tplId);
      return fillPlain(instanceText(t, c.variantIndex||0));
    }).join('\n\n');
    const hasEmpty = currentVars().some(v=>!(resolvedVarValue(v)&&String(resolvedVarValue(v)).trim()));
    const ok = await copyText(fullText);
    if(ok) showToast(hasEmpty ? '已複製全部,但還有變數未填喔' : '已複製全部回覆', hasEmpty);
    else showToast('複製失敗', true);
  };

  document.getElementById('searchInput').oninput = (e)=>{
    searchTerm = e.target.value;
    renderList();
  };

  document.querySelectorAll('.mode-tab').forEach(b=>{
    b.onclick = ()=> setSidebarMode(b.dataset.mode);
  });

  document.getElementById('saleTypePre').onclick = ()=>{ wizSaleType='pre'; renderWizard(); };
  document.getElementById('saleTypePost').onclick = ()=>{ wizSaleType='post'; renderWizard(); };

  document.getElementById('btnManageVars').onclick = openVarsModal;

  renderAll();
  renderCompose();
}

window.onload = init;
