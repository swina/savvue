const getters = {
  navigation:   state => state.navigation,
  home:         state => state.navigation.home,
  menu_header:  state => state.navigation.menu.header,
  menu_footer:  state => state.navigation.menu.footer,
  pagine:       state => state.navigation.pagine,
  skip:         state => state.navigation.skip,
  user:         state => state.navigation.user,
  logged:       state => state.navigation.logged,
  clienti_sort:       state => state.tables.clienti.sort,
  qualifiche:   state => state.tables.qualifiche,
  agenti:       state => state.tables.agenti
}

export default getters
