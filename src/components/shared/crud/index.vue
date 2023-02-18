<template>
    <div class="bg-gray-100 rounded mb-2 p-2">
        <div class="bg-gray-500 text-white p-1 font-bold">{{ $attrs.title }}</div>
        <div class="w-full flex flex-row flex-wrap justify-left text-left">
            <template v-for="(field,index) in fields">
                <div v-if="field.editable" :key="'field_' + index" class="relative w-full md:w-1/2 px-2">
                    <label class="text-xs font-bold">{{field.label}} {{field.required?'*':''}}</label>
                    <br>
                    <input v-if="field.type === 'text'" type="text" class="uppercase" v-model="record[field.key]" :data-required="field.required?true:false"/>
                    <input v-if="field.type === 'boolean'" type="checkbox" v-model="record[field.key]"/>
                    <select v-if="field.type === 'relation'" v-model="record[field.key]">
                        <option v-if="field.type==='relation'" v-for="(option,i) in tables[field.relation][field.subset]" :key="'opt_' + field.key + '_' + i" :value="!field.simple?option[field.id]:i">
                            {{ !field.simple ? option[field.display] : option }} 
                        </option>
                    </select>
                    <input v-if="field.type === 'color'" type="color" id="colorPicker" class="h-8 w-8 opacity-0" v-model="record[field.key]"/><div v-if="field.type === 'color'" class="absolute z-20 h-8 w-8 top-6 border left-3 rounded-full cursor-pointer" :style="'background:#' + record[field.key].replace('#','')" @click="viewPicker"></div>
                </div>
            </template>
        </div>
        <small>* campi obbligatori</small>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'UiCrud',
    props: {
        record: { type: Object, required: true, default:()=>{} },
        fields: { type: Array, required: true, default:()=>[] }
    },
    computed:{
        ...mapState ( ['tables'] ),
        getcolor(){
            return this.record.ac_colore
        }
    },
    methods:{
        viewPicker(){
            let colorPicker = document.getElementById('colorPicker')
            colorPicker.showPicker()
        }
    }
}
</script>