const tables = {
    state: {
        qualifiche: {
            label: ['' , 'STANDARD' , 'DATI ERRATI' , 'MAI FATTO RICHIESTA' , 'NON RISPONDE'],
            icon: ['','icons/flag_green.gif','icons/flag_red.gif','img/icons/flag_blue.gif','icons/flag_orange.gif']
        },
        macrogruppi: [
            'Direzione Commerciale',
            'Affiliati',
            'Agenti',
            'Ufficio Tecnico'
        ],
        status:null,
        clienti: {
            sort : {
                 dt_data_registrazione: -1 
            },
            fields: [
                {
                    key: 'id_cliente',
                    label: 'ID',
                    hide: true
                },
                {
                    key: 'ac_cognome',
                    label: 'Cognome',
                    style: 'text',
                    table: true
                },
                {
                    key: 'ac_nome',
                    label: 'Nome',
                    style: 'text',
                    table: true
                },
                {
                    key: 'ac_indirizzo',
                    label: 'Indirizzo',
                    style: 'text',
                    table: true
                },
                {
                    key: 'ac_citta',
                    label: 'Citta',
                    style: 'text',
                    table: true
                },
                {
                    key: 'bl_attivo',
                    label: 'Ass',
                    style: 'status',
                    table: true,
                    icon: 'lens'
                },
                {
                    key: 'id_agente' ,
                    label: 'Agente',
                    style: 'table',
                    table: true,
                    relation: 'agenti',
                    id: 'id_persona'
                },
                {
                    key: 'dt_data_registrazione' ,
                    label: 'Registrato',
                    style: 'data'
                },
                {
                    key: 'ac_segnalatore',
                    label: 'Segnalatore',
                    style: 'text',
                    table: true
                },
            ]
        },
        agenti: null,
        processi: null,
        gruppi: null,
        models: {
            status : null,
            clienti: null,
            agenti: null
        },
        exportStatus:false
    },
    mutations: {
        agenti(state,agenti){
            state.agenti = agenti
        },
        processi(state,processi){
            state.processi = processi
        },
        status(state,status){
            state.status = status
        },
        gruppi ( state , gruppi ){
            state.gruppi = gruppi
        },
        models ( state , [ table , payload ] ){
            state.models[table] = payload
        },
        exportStatus ( state , status ){
            state.exportStatus = status
        }
    },
    actions: {
        setStatus ( {commit} , status ){
            commit ( 'status' , status )
        },
        setAgenti ( { commit } , agenti ){
            commit ( 'agenti' , agenti )
        },
        setProcessi ( { commit } , processi ){
            commit ( 'processi' , processi )
        },
        setGruppi ( { commit } , payload ){
            commit ( 'gruppi' , payload )
        },
        setModel ( { commit } , [table,payload] ){
            commit ( 'models' , [table,payload] )
        },
        setExport ( { commit } , exportStatus ){
            commit ( 'exportStatus' , exportStatus )
        }
    }

}
export default tables