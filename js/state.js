/**
 * Single shared runtime state. Its property values preserve the existing
 * template, category and CustomVars data structures exactly.
 */
export const state = {
  templates: [],
  categories: [],
  composeList: [],
  varsValues: {},
  customVars: ['訂單編號'],
  activeStage: 'all',
  activeCategory: 'all',
  searchTerm: '',
  editingId: null,
  wizActiveCat: null,
  wizSaleType: 'post',
  sidebarMode: 'wizard',
  currentTemplate: null,
  currentCategory: null,
  selectedTemplateId: null,
  db: null
};
