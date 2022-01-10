<template>
    <div>
        <div class="bg-gray-500 text-white p-1 font-bold">{{ $attrs.title }}</div>
        <div class="w-full flex flex-row flex-wrap justify-left text-left">
            <template v-for="(field,index) in fields">
                <div v-if="field.editable" :key="'field_' + index" class="w-full md:w-1/2 px-2">
                    <label class="text-xs font-bold">{{field.label}}</label>
                    <br>
                    <input v-if="field.type === 'text'" type="text" v-model="record[field.key]"/>
                    <input v-if="field.type === 'checkbox'" type="checkbox" v-model="field.default?record[field.key]:!record[field.key]"/>
                    <select v-if="field.type === 'relation'" v-model="record[field.key]">
                        <option v-if="field.type==='relation'" v-for="(option,i) in tables[field.relation][field.subset]" :key="'opt_' + field.key + '_' + i" :value="!field.simple?option[field.id]:i">
                            {{ !field.simple ? option[field.display] : option }} 
                        </option>
                    </select>
                </div>
            </template>
        </div>
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
        ...mapState ( ['tables'] )
    }
}
</script>