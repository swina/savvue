const navigation = {
    state:  {
        locale: null,
        home: 'http://www.savinimilano.com/',
        user: null,
        logged: false,
        menu: {
            header: [
                {
                    name: 'alimentare',
                    active: '/img/industria-alimentare-on.png',
                    off: '/img/industria-alimentare-off.png'
                },
                {
                    name: 'chimico-minerario',
                    active: '/img/settore-chimico-minerario-on.png',
                    off: '/img/settore-chimico-minerario-off.png'
                },
                {
                    name: 'farmaceutico',
                    active: '/img/industria-farmaceutica-on.png',
                    off: '/img/industria-farmaceutica-off.png'
                }
            ],
            footer: [
                {
                    title: 'Azienda',
                    items: [
                        {
                            title : 'Chi Siamo',
                            path : '/azienda/chi-siamo',
                            top:true
                        },
                        {
                            title : 'Storia',
                            path : '/azienda/storia',
                            top:false
                        },
                        {
                            title : 'Rappresentanze',
                            path : '/azienda/rappresentanze',
                            top: false
                        },    
                        {
                            title : 'Contatti',
                            path : '/azienda/contatti',
                            top: true
                        },

                    ]
                },
               
            ]
        },
        pagine: null,
        skip: 0,
        loading: false,
        message: '',
        error: '',
        modal: null
    },
    mutations: {
        locale ( state , locale ){
            state.locale = locale
        },
        user ( state , user ){
            state.user = user
        },
        logged ( state , logged ){
            state.logged = logged
        },
        pagine ( state , pagine ){
            state.pagine = pagine
        },
        skip ( state , skip ){
            state.skip = skip
        },
        loading ( state , loading ){
            state.loading =! state.loading 
        },
        message ( state , message ){
            state.message = message
        },
        error ( state , error ){
            state.error = error
        },
        modal ( state , modal ){
            state.modal = modal
        }
    },
    actions: {
        SetLocale ( { commit } , locale ){
            commit ( 'locale' , locale )
        },
        SetUser ( { commit } , user ){
            commit ( 'user' , user )
        },
        SetLogged( { commit } , logged ){
            commit ( 'logged' , logged )
        },
        SetPagine ( { commit } , pagine ){
            commit ( 'pagine' , pagine )
        },
        SetSkip( { commit} , skip ){
            commit ( 'skip' , skip )
        },
        loading ( { commit } , loading ){
            commit ( 'loading' , loading )
        },
        message ( { commit} , message ){
            commit ( 'message' , message )
        },
        error ( { commit} , error ){
            commit ( 'error' , error)
        },
        modal ( { commit} , modal ){
            commit ( 'modal' , modal )
        }
    }
}

export default navigation