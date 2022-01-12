const schema = {
    agenti : {
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
    }
}

export default schema