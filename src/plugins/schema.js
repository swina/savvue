const schema = {
    clienti: {
        sort : {
             dt_data_registrazione: -1 
        },
        fields: [
            {
                key: 'ac_cognome',
                label: 'Cognome',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },
            {
                key: 'ac_nome',
                label: 'Nome',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },
            {
                key: 'ac_indirizzo',
                label: 'Indirizzo',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },
            {
                key: 'ac_citta',
                label: 'Citta',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },

            {
                key: 'ac_pv',
                label: 'PV',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },
            {
                key: 'ac_telefono',
                label: 'Telefono',
                type: 'text',
                view: false,
                editable: true,
                searchable: false
            },
            {
                key: 'ac_celluare',
                label: 'Mobile',
                type: 'text',
                view: false,
                editable: true,
                searchable: false
            },
            {
                key: 'ac_email',
                label: 'Email',
                type: 'text',
                view: false,
                editable: true,
                searchable: false
            },
            {
                key: 'bl_attivo',
                label: 'Ass',
                type: 'boolean',
                icon: 'lens',
                view: true,
                editable: false
            },
            {
                key: 'id_qualifica',
                label: 'Qualifica',
                type: 'list_icon',
                list: 'qualifiche',
                view: true,
                editable: false,
                searchable: false
            },
            {
                key: 'id_qualifica',
                label: 'Qualifica',
                type: 'relation',
                relation: 'qualifiche',
                display: 'ac_qualifica',
                subset: 'label',
                simple: true,
                hide: true,
                editable: true,
                searchable: true
            },
            {
                key: 'id_agente' ,
                label: 'Agente',
                type: 'relation',
                relation: 'agenti',
                display: 'ac_azienda',
                id: 'id_persona',
                subset: 'data',
                view: true,
                editable: true,
                searchable: true
            },
            {
                key: 'dt_data_registrazione' ,
                label: 'Registrato',
                type: 'text',
                format: 'date',
                view: true,
                editable: false,
                searchable: true
            },
            {
                key: 'ac_segnalatore',
                label: 'Segnalatore',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },
        ]
    },
    agenti : {
        sort : {
            id_persona: 1 
        },
        fields : [
            { 
                key: 'id_persona',
                label: 'ID',
                type: 'text',
                hide: true,
                editable: false,
                searchable: false
            },
            { 
                key: 'ac_cognome',
                label: 'Cognome',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },
            { 
                key: 'ac_nome',
                label: 'Nome',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },
            { 
                key: 'ac_email',
                label: 'Email',
                type: 'text',
                class: 'lowercase',
                view: true,
                editable: true,
                searchable: true
            },
            { 
                key: 'ac_telefono',
                label: 'Telefono',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },
            { 
                key: 'ac_cellulare',
                label: 'Mobile',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },
            {
                key: 'id_gruppo' ,
                label: 'Gruppo',
                type: 'relation',
                relation: 'gruppi',
                display: 'ac_gruppo',
                id: 'id_gruppo',
                subset: 'data',
                view: true,
                editable: true,
                searchable: true
            },
            { 
                key: 'bl_cancellato',
                label: 'Attivo',
                type: 'checkbox',
                default: false,
                view: true,
                editable: true,
                searchable: true
            },
        ]
    },
    processi: {
        sort : {
            int_ordine: 1 
        },
        fields: [
            {
                key: 'id_processo',
                label: 'ID',
                type: 'text',
                hide: true,
                editable: false,
                searchable: false
            },
            {
                key: 'ac_colore',
                label: 'Colore',
                type: 'color',
                view: true,
                editable: true,
                searchable: false
            },
            {
                key: 'ac_processo',
                label: 'Azione',
                type: 'text',
                view: true,
                editable: true,
                searchable: false
            },
            {
                key: 'ac_sigla',
                label: 'Sigla',
                type: 'text',
                view: true,
                editable: true,
                searchable: false
            },
            {
                key: 'int_timer_limit',
                label: 'Timer H',
                type: 'text',
                view: true,
                editable: true,
                searchable: false
            },
            {
                key: 'int_prealert',
                label: 'Pre Alert',
                type: 'text',
                view: true,
                editable: true,
                searchable: false
            },
            {
                key: 'int_postalert',
                label: 'Post Alert',
                type: 'text',
                view: true,
                editable: true,
                searchable: false
            },
            {
                key: 'bl_alert_admin',
                label: 'Alert > Direz. Comm.',
                type: 'checkbox',
                default: true,
                view: true,
                editable: true,
                searchable: false
            },
            {
                key: 'bl_alert_assegnato',
                label: 'Alert > Altro',
                type: 'checkbox',
                default: true,
                view: true,
                editable: true,
                searchable: false
            },
            {
                key: 'ac_modulo',
                label: 'Modulo',
                type: 'text',
                view: true,
                editable: true,
                searchable: false
            },
        ]
    },
    alerts : {
        fields: [
            { 
                key: 'id_persona',
                label: 'ID',
                type: 'text',
                hide: true,
                editable: false,
                searchable: false
            },
            { 
                key: 'ac_cognome',
                label: 'Cognome',
                type: 'text',
                view: true,
                editable: true,
                searchable: true
            },
            {
                key: 'data_status',
                label: 'Data',
                type: 'text',
                view: true,
                editable: false,
                searchable: false
            },
            {
                key: 'ora_status',
                label: 'Ora',
                type: 'text',
                view: true,
                editable: false,
                searchable: false
            },
            {
                key: 'id_processo',
                label: 'Azione',
                type: 'relation',
                subset: 'data',
                display: 'ac_processo',
                id: 'id_processo',
                view: true,
                editable: false,
                searchable: false
            }
        ]
    },
    users: {
        sort : {
            id: 1 
        },
        fields:[
            {
                key: 'id',
                label: 'ID',
                type: 'text',
                hide: true,
                editable: false,
                searchable: false
            }, 
            {
                key: 'email',
                label: 'Utente',
                type: 'text',
                class: 'lowercase',
                view: true,
                editable: true,
                searchable: false
            },
            {
                key: 'account',
                label: 'Email',
                type: 'text',
                class: 'lowercase',
                view: true,
                editable: true,
                searchable: false
            },
        ]
    }
}

export default schema