<template>
    <div>
        <button class="btn-red" @click="$emit('undo')">Annulla</button>
        <button class="btn-green" @click="$emit('confirm')">Conferma</button>
    </div>
</template>