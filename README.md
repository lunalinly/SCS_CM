# 小幫手話術台模板

一個可部署到 GitHub Pages 的純 HTML 客服話術管理工具。沒有伺服器、不需要安裝套件；新增、編輯、匯入的資料會保存在使用者目前瀏覽器。

## 功能

- 分類 → 選擇問題 → 細項回覆的快速組合流程
- 問題標籤與「全部／標籤」篩選
- 多個回覆選項，各自可命名
- 操作提示：純文字、步驟、每一步網址、參考連結
- Excel 匯入、匯出與空白模板下載
- JSON 完整備份與還原
- 小編代號自動保存於目前瀏覽器

## 最快使用方式

1. 在本倉庫首頁按 **Use this template**。
2. 選擇 **Create a new repository**。
3. 輸入自己的倉庫名稱，例如 `my-customer-script-tool`。
4. 選擇 **Public**（GitHub Free 的 Pages 最方便）或依需求選 Private。
5. 按 **Create repository from template**。
6. 進入新倉庫的 **Settings** → **Pages**。
7. 在 **Build and deployment** 的 **Source** 選擇 **Deploy from a branch**。
8. Branch 選擇 **main**，資料夾選 **/(root)**，然後按 **Save**。
9. 等待 GitHub 建置完成；重新整理 Pages 頁面即可看到網站網址。
10. 之後每次修改 `index.html`、`js/app.js` 或 `css/style.css` 並推送到 `main`，GitHub Pages 會自動更新。

> 網站資料是保存在使用者自己的瀏覽器中。更新程式不會清除既有話術；但換電腦、換瀏覽器或清除瀏覽器資料前，請先下載 JSON 備份。

## 如果沒有看到「Use this template」

可用 Fork 建立副本：

1. 在倉庫右上角按 **Fork**。
2. 選擇自己的帳號與新倉庫名稱。
3. 建立後依照上方「最快使用方式」第 6 步起啟用 GitHub Pages。

若 Fork 也不適合，可按 **Code** → **Download ZIP**，解壓縮後在自己的 GitHub 建立空白倉庫，再將檔案上傳。

## Excel 匯入格式

建議先在網站按 **下載空白模板**。欄位分成三段：

1. 基本資料：`階段`、`大類型`、`售前售後`、`標籤`、`標題`
2. 回覆選項：`預設按鍵名稱`、`回覆內容`，以及 `按鍵名稱2`／`回覆方式2` 等
3. 操作提示：`提示文字`、`操作步驟`、`操作步驟連結`、`參考連結名稱`、`參考連結`

同一儲存格內若有多個步驟或連結，請使用 Excel 的換行分隔；匯入時會依順序還原。

## 使用與分享注意事項

- 請不要把客戶個資、登入密碼或 API 金鑰寫進話術、Excel 或公開倉庫。
- 若要給多人使用，建議每個人建立自己的模板副本；各自的資料才不會互相影響。
- GitHub Pages 網址通常是 `https://你的帳號.github.io/你的倉庫名稱/`。

## 專案檔案

- `index.html`：網站畫面與快速開始提示
- `js/app.js`：話術、匯入匯出與儲存功能
- `css/style.css`：網站外觀
