<template>
    <div class="p-4 relative w-full bg-white rounded">
        <transition name="fade"> 
            <div class="fixed inset-0 z-2 flex justify-center items-center h-screen" v-if="selectedEvent">
                <div class="md:w-1/2 lg:w-1/3 p-4 flex flex-col text-left text-sm p-2 relative bg-white rounded-lg shadow-lg border-4" :style="'border-color:' + selectedEvent.backgroundColor">
                    <div class="flex flex-row justify-end absolute right-0 top-0">
                        <icon icon="save" title="Salva" class="text-base" @click="selectedEvent=null"/>
                        <icon icon="delete" title="Elimina" class="mx-2 text-base" @click="selectedEvent=null"/>
                        <icon icon="close" title="Chiudi" class="text-base" @click="selectedEvent=null"/>
                    </div>
                    <div class="font-bold">{{ selectedEvent.extendedProps.data }} - {{ selectedEvent.extendedProps.ora }}</div>
                    <div>Cliente: {{ selectedEvent.extendedProps.cliente.toUpperCase() }}</div>
                    <div>Citta: {{ selectedEvent.extendedProps.citta.toUpperCase() }}</div>
                    <div>Telefono: {{ selectedEvent.extendedProps.telefono }}</div>
                    <div>Agente {{ selectedEvent.extendedProps.agente }}</div>
                    <div>Azione: {{ selectedEvent.extendedProps.azione }}</div>
                    <div>Note: <br><textarea class="text-xs h-24 w-full bg-gray-200">{{ selectedEvent.extendedProps.notes }}</textarea></div>
                </div>
            </div>
        </transition>
        <div class="justify-center overflow-y-auto flex w-full flex-col cursor-pointer">
            <FullCalendar ref="fullCalendar" :options="config" @prev="prev()"/>
        </div>
        
    </div>
</template>

<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { mapState } from 'vuex'
export default {
    name: 'AgendaUI',
    data:()=>({
        today: new Date(),
        mode: 'dayGridMonth',
        isDay: false,
        calendarOptions: {
            plugins: [ dayGridPlugin, timeGridPlugin, listPlugin , interactionPlugin ],
            initialView: 'timeGridWeek',
            events:[],
            locale: 'it',
            timeZone: 'UTC',
            weekends: false,
            height: 650,
            slotMinTime: "03:00:00",
            slotMaxTime: "23:00:00",
            headerToolbar: {
                start: '',
                center: 'title',
                end: 'today listDay,timeGridWeek,dayGridMonth prev,next'
            }
        },
        calendarApi: null,
        selectedEvent: null,
        isRun: false
    }),
    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
    computed: {
        ...mapState ( ['tables','navigation'] ),
        config () {
            return {
                ... this.calendarOptions,
                ...this.eventHandlers
            }
        },

        eventHandlers () {
            return {
                dateClick: this.onDateClick,
                eventClick: this.onEventClick,
                eventDrop: this.onEventDrop,
                eventResize: this.onEventDrop,
                datesSet: this.onDateSelect
            }
        }

    },
   
    methods:{
        qry(){
            let today = this.today.toISOString().split('T')[0]
            let next = this.today
            next.setDate(this.today.getDate() + 30);
            let query = { 
                dt_from: today  ,
                // dt_to: next.toISOString().split('T')[0],
                id_agente : this.navigation.user.int_livello > 0 ? this.navigation.user.id_persona : null,
                $limit: 200
            }
            this.$store.dispatch ( 'loading' )
            console.log ( query )
            this.$api.service('agenda').find({query}).then ( response => {
                console.log ( response[0] )
                this.calendarOptions['events'] = response[0].map ( event => {
                    return { 
                        title: event.ac_processo + ' > ' + event.ac_cognome.toUpperCase() , 
                        start: event.dt_status , 
                        backgroundColor: '#' + event.ac_colore , 
                        id: event.id_status , 
                        notes: event.ac_note , 
                        agente: event.agente , 
                        azione: event.ac_processo , 
                        cliente: event.ac_cognome , 
                        citta: event.ac_citta , 
                        telefono: event.ac_telefono , 
                        data: event.data_status , 
                        ora: event.ora_status }
                })
                this.$store.dispatch ( 'loading' )
            })
        },
        skip(n){
            console.log ( n )
            let newDate = new Date(this.today)
            newDate.setDate( newDate.getDate() + n )
            this.today = newDate
        },
        onDateClick (payload) {
            this.calendarOptions.initialView = 'listDay'
            this.calendarOptions.initialDate = payload.date
            this.today = payload.date
            this.isDay = true
        },
        onEventClick ( payload ){
            this.selectedEvent = payload.event
        },
        onDateSelect ( payload ){
            this.today = payload.start
        },
    },
    mounted(){
        this.qry()
        // let today = this.today.toISOString().split('T')[0]
        // this.skip(0)
        this.calendarApi = this.$refs.fullCalendar.getApi()
        let btnPrev = document.querySelector('.fc-prev-button')
        btnPrev.addEventListener('click',()=>{
            this.qry()
        })
        let btnNext = document.querySelector('.fc-next-button')
        btnNext.addEventListener('click',()=>{
            this.qry()
        })
    }
}
</script>