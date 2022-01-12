<template>
    <div>
        Table {{ model }}
        <div class="text-left">Fields</div>
        <div class="flex flex-row w-full justify-start items-start">
            <div class="w-1/4">
                <template v-for="(field,i) in tables.models[model]">
                        <div class="w-1/4 text-left p-1" :class="current===field?'font-bold':''" @click="current=field">{{ field }}</div>
                </template>
            </div>
            <div class="w-3/4 flex flex-row"  v-if="current">
                <div class="w-1/4">
                    <select v-model="tipo" class="p-2">
                        <option v-for="def in attributes.style" :value="def">{{ def }}</option>
                    </select>
                </div>
                <div class="w-1/2" v-if="tipo">     
                    <template v-for="attr in Object.keys(attributes)">
                        <div v-if="attr != 'style'">
                            {{ attr }}
                            <input type="text" v-model="definition[field][attr]" v-if="tipo === 'text'"/>
                            <input type="checkbox" v-model="definition[attr]" v-if="attributes[attr]==='boolean'"/>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'ObjectModels',
    data:()=>({
        model: 'status',
        current: null,
        tipo: null,
        attributes: {
            label: 'text',
            style: ['text','checkbox','relation'],
            display: 'text',
            view: 'boolean',
            editable: 'boolean',
            subset: 'text',
            id: 'text',
            searchable: 'boolean'
        },
        definition: {}
    }),
    computed:{
        ...mapState ( ['tables'] )
    }

    // {
    //             key: 'id_gruppo' ,
    //             label: 'Gruppo',
    //             type: 'relation',
    //             relation: 'gruppi',
    //             display: 'ac_gruppo',
    //             id: 'id_gruppo',
    //             subset: 'data',
    //             view: true,
    //             editable: true,
    //             searchable: true
    //         },
}
</script>