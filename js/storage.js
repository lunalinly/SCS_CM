import { state } from './state.js';

export const STORAGE_KEY = 'helper_script_templates_v3';
export const CATEGORY_STORAGE_KEY = 'helper_script_categories_v3';
export const CUSTOM_VARS_KEY = 'helper_script_custom_vars_v3';

export const SEED_CATEGORIES = [
  {id:'logistics', label:'物流', emoji:'🚚'},
  {id:'return', label:'退換貨', emoji:'📦'},
  {id:'payment', label:'付款', emoji:'💳'},
  {id:'product', label:'商品/庫存', emoji:'🛍️'},
  {id:'other', label:'其他', emoji:'💬'}
];

export const SEED_TEMPLATES = [
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


const STAGE_ORDER = {open:0, body:1, wait:2, close:3};
const SINGLE_STAGES = new Set(['open','wait','close']);

function catLabel(id){ const c = state.categories.find(x=>x.id===id); return c ? c.label : (id||''); }

export async function loadCategories(){
  try{
    const res = localStorage.getItem(CATEGORY_STORAGE_KEY) || localStorage.getItem('categories_v2');
    if(res){
      const parsed = JSON.parse(res);
      if(Array.isArray(parsed) && parsed.length) return parsed;
    }
  }catch(e){ console.error(e); }
  await saveCategories(SEED_CATEGORIES);
  return SEED_CATEGORIES.slice();
}

export async function saveCategories(list){
  state.categories = list;
  try{ localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(list)); }
  catch(e){ console.error('儲存類型失敗', e); }
}

export async function loadTemplates(){
  try{
    const res = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('templates_v2');
    if(res){
      const parsed = JSON.parse(res);
      if(Array.isArray(parsed) && parsed.length) return parsed;
    }
  }catch(e){ console.error(e); }
  await saveTemplates(SEED_TEMPLATES);
  return SEED_TEMPLATES.slice();
}

export async function saveTemplates(list){
  state.templates = list;
  try{ 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); 
    updateSaveBadge();
  }
  catch(e){ console.error('儲存失敗', e); showToast('儲存失敗,請稍後再試', true); }
}

export function loadCustomVars(){
  try{
    const res = localStorage.getItem(CUSTOM_VARS_KEY) || localStorage.getItem('custom_vars_v2');
    if(res) {
      const parsed = JSON.parse(res);
      if(Array.isArray(parsed)) return parsed;
    }
  }catch(e){}
  return ['訂單編號'];
}

export function saveCustomVars(list){
  state.customVars = list;
  try{ localStorage.setItem(CUSTOM_VARS_KEY, JSON.stringify(list)); }catch(e){}
}

export function updateSaveBadge(){
  const badge = document.getElementById('saveBadge');
  if(badge) badge.title = `已有 ${state.templates.length} 則話術與 ${state.categories.length} 個分類保存於此瀏覽器中`;
}

