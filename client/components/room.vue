<template>
    <div class="room">
        <h1>{{ msg }}</h1>
        
        </ul>
    </div>
</template>

<script>
export default {
    name: 'room',
    data () {
        return {
            msg: 'room'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
