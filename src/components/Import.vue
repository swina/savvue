<template>
    <div class="bg-gray-300 rounded p-2 text-xs pb-20 relative min-h-screen h-screen">
      <div class="bg-white mx-20 p-2 rounded flex flex-col justify-start text-left overflow-y-auto pb-40">
        Questa procedura importa un file Excel di clienti/contatti direttamente nel database.
        Il file deve rispettare un formato predefinito al fine di essere corretamente importato.
        <br>
        <div class="w-1/5 flex flex-row items-center rounded-full p-1">Scarica template file <a href="/test-import-sav.xlsx" target="_blank" title="Scarica template per importazione contatti"><icon icon="download_for_offline"></icon></a></div>
        <input type="file" @change="onChange" class="my-8" title="Seleziona il file da importare"/>
        <xlsx-read :file="file">
          <xlsx-json @parsed="imported" style="display:none;">
            <template #default="{collection}">
            {{ collection }}
            </template>
          </xlsx-json>
        </xlsx-read>
        <div v-if="loading">Lettura file in corso ... attendere prego</div>
        
        <div class="pb-60 w-full overflow-y-auto h-screen">
        
        <table v-if="contatti && contatti.length > 0 && check" class="pb-20 w-full">
            <thead class="border-b">
                <th v-for="(field,i) in fields" align="left" style="padding:.3rem;border-bottom:1px solid #eaeaea;">
                    {{ field }}
                </th>
                <th>Check</th>
                <th></th>
            </thead>
            <tr :key="'riga_' + n" v-for="(item,n) in contatti" class="border-b">
                <td :key="'cella_' + i" v-for="(field,i) in fields" align="left" style="padding:.3rem;border-bottom:1px solid #eaeaea;">
                    {{ item[field] }}
                </td>
                <td>
                  <div v-if="duplicated[n]" class="text-red-500 cursor-pointer" @click="select(item.email)">
                    Esiste
                  </div>
                  <div v-else>
                    <icon icon="check" class="text-green-500"></icon>
                  </div>
                <!-- <button @click="checkEmail(item)">!</button> -->
                </td>
                <td>
                  <icon v-if="duplicated[n]" icon="delete" class="text-red-500 text-md" @click="remove(n)"/>
                </td>
            </tr>
        </table>
        <div class="my-4" v-if="contatti && contatti.length">Totale contati da importare: {{contatti.length}}</div>
        <div v-if="contatti && saved">Importazione dati effettuata correttamente</div>
        <div v-if="error">Errore nell'importazione. Si prega di verificare il file</div>
        <div v-if="contatti && !check">Errore! File non valido</div>
        <!-- <button v-if="contatti.length && check && !saved" @click="checkAll" style="margin-top:1rem;">Verifica</button> -->
        <button v-if="contatti && contatti.length && check && !saved" @click="save" class="my-4 bg-lime-500">Importa Contatti</button>

        </div>
      </div>
      <div class="fixed top-0 right-0 w-1/3 h-screen bg-gray-300 p-1" v-if="selected">
        <ui-crud :fields="columns" title="Cliente" :record="selected"></ui-crud>
       <button class="bg-lime-500 text-white my-4" @click="selected=null">Chiudi</button></div>
      </div>
    </div>
</template>
<script>
import { XlsxRead, XlsxJson , XlsxDownload } from "vue-xlsx/dist/vue-xlsx.es.js"
export default {
  components: {
    XlsxRead,
    XlsxJson,
    XlsxDownload
  },
  data() {
    return {
      loading: false,
      contatti: null,
      duplicated: [],
      selecteSheet: null,
      selected: null,
      file: null,
      fields: ['tipologia_di_abitazione','email','full_name','phone_number','province'],
      saved: false,
      error: '',
      columns:[
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
        ],
    };
  },
  computed:{
      check(){
          if ( !this.contatti.length  ) return true
          return this.contatti[0]['tipologia_di_abitazione'] && this.contatti[0].email && this.contatti[0].phone_number && this.contatti[0].province?
            true 
             : false
      }
  },
  methods: {
    select(email){
      this.selected = this.duplicated.filter(a=>a.ac_email===email)[0]
    },
    remove(index){
      this.contatti.splice(index,1)
    },
    checkAll(){
      this.duplicated=[];
      this.contatti.forEach ( async ( contatto , index ) => {
        
        this.$store.dispatch ( 'loading' )
        let query = {
          query: {
            email: contatto.email
          }
        }
        let dup = await this.$api.service('clienti').find ( query)
        if ( dup.data ){
          this.duplicated.push ( dup.data[0] )
        } else {
          this.duplicated.push ( null )
        }
        
        this.$store.dispatch ( 'loading' )
      })
      
    },
    checkEmail(item){
      let email = item.email
      let query = {
        query: {
          email: email
        }
      }
      this.$api.service('clienti').find ( query).then ( response=>{
        console.log ( response )
      })
    },
    onChange(event) {
      this.loading = true
      this.file = event.target.files ? event.target.files[0] : null;
    },
    save(){
        if ( this.contatti ){
          let vm = this
          this.contatti.forEach ( contatto=> {
            let obj = {
              ac_cognome : contatto.full_name,
              ac_citta: contatto.province,
              ac_telefono: contatto.phone_number,
              ac_cellulare: contatto.phone_number,
              ac_email: contatto.email,
              ac_pv: contatto.province,
              ac_info: 'Tipologia: ' + contatto.tipologia_di_abitazione,
              ac_comunicazioni: 'Abitazione: ' + contatto.tipologia_di_abitazione,
              ac_segnalatore: 'Promo microcappotto',
              bl_attivo: -1,
              dt_data_registrazione: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }
            this.$api.service('contact').create ( obj ).then ( response => {
              console.log ( response )
              vm.saved = true
              vm.error = false
            }).catch ( error => {
              console.log ( error )
              vm.saved = false
              vm.error = true
            })
            console.log ( obj )
          })
        }
    },
    async imported(data){
        this.loading = false
        this.contatti = data
        await this.checkAll()
    }
  }
}
</script>