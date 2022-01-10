<template>
    <div class="w-full mt-20">
        <div v-if="output">
            <template v-for="(line,index) in output">
                <div :key="'timeline_' + index" class="timeline text-lg text-left">
   	                <div class="container left">
                        <div class="timelinecontent">
                            <h2>{{line.year}}</h2>
                        </div>
                        <div class="timelinetext">
                            <p style="text-left text-sm" v-html="line.content"></p>
                        </div>
                    </div>
                </div>
                
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Timeline',
    data:()=>({
        output: null
    }),
    props: { 
        content : { type: Array , required: false , default:()=>[] }
    },
    mounted(){
        if ( this.content[0].json ){
            this.output = JSON.parse(this.content[0].json)
        }
    }
}
</script>
<style scoped>


/* The actual timeline (the vertical ruler) */
.timeline {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    clear: both;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
     content: '';
    position: absolute;
    width: 6px;
    /* background-color: #cecece; */
    top: 0;
    bottom: 0;
    left: 100%;
    margin-left: -3px;
}

/* Container around content */
.container {
padding: 0px;
    position: relative;
    background-color: inherit;
    width: 90%;
}

/* The circles on the timeline */
.timelinecontent::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  right: -15px;
  background-color: white;
  border: 4px solid #d10219;
  top: 28px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the container to the left */
.left {
  left: 0;
}

/* Place the container to the right */
.right {
  left: 50%;
}





/* Fix the circle for containers on the right side */
.right::after {
  left: -26px;
}

/* The actual content */
.timelinecontent {
    padding: 20px 30px;
    background-color: white;
    position: relative;
    /* border-radius: 6px; */
    float: left;
    width: 20%;
    border-right: 4px solid #cecece;
    margin-right: 3rem;
    text-align: center;
    min-height: 7rem;
}
.timelinetext {
	padding:10px 30px;
    background-color: white;
    margin-right: 3rem;
    width: 85%;
    min-height: 6rem;
    margin-left: 20%;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
/* Place the timelime to the left */
  .timeline::after {
    left: 31px;
  }

/* Full-width containers */
  .container {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }

/* Make sure that all arrows are pointing leftwards */
  .container::before {
    left: 60px;
    border: medium solid white;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }

/* Make sure all circles are at the same spot */
  .left::after, .right::after {
    left: 15px;
  }

/* Make all right containers behave like the left ones */
  .right {
    left: 0%;
  }
}
</style>