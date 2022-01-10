const products = {
    state: {
        products: null,
        sectors: null,
        applications: null,
        categories: null ,
        adminCategories: null,
    },
    mutations: {
        products ( state , products ){
            state.products = products
        },
        sectors ( state , sectors ){
            state.sectors = sectors
        },
        applications ( state , applications ){
            state.applications = applications
        },
        categories ( state , categories ){
            state.categories = categories
        },
        adminCategories ( state , adminCategories ){
            state.adminCategories = adminCategories
        }
    },
    actions: {
        SetProducts ( {commit} , products ){
            commit ( 'products' , products )
        },
        SetSectors ( {commit} , sectors ){
            commit ( 'sectors' , sectors )
        },
        SetApplications ( {commit} , applications ){
            commit ( 'applications' , applications )
        },
        SetCategories ( {commit} , categories ){
            commit ( 'categories' , categories )
        },
        SetAdminCategories ( {commit} , adminCategories ){
            commit ( 'adminCategories' , adminCategories )
        }
    }
}

export default products