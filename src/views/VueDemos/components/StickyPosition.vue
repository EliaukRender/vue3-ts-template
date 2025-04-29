<template>
  <div class="sticky-demo">
    <div class="container">
      <div v-for="letter in letters" :key="letter" class="sticky-section">
        <div class="sticky-header">{{ letter }}</div>
        <div class="content">
          <ul class="name-list">
            <li v-for="name in getNamesByLetter(letter)" :key="name">{{ name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
const letters = ['A', 'B', 'C', 'D', 'E']

const namesData = {
  A: [
    'Alice Anderson', 'Adam Adams', 'Alex Armstrong', 'Amanda Allen', 'Andrew Austin',
    'Amy Adams', 'Arthur Anderson', 'April Allen', 'Alan Armstrong', 'Anna Austin',
    'Aaron Adams', 'Ashley Anderson', 'Anthony Allen', 'Audrey Armstrong', 'Albert Austin',
    'Abigail Adams', 'Austin Anderson', 'Ava Allen', 'Adrian Armstrong', 'Alyssa Austin'
  ],
  B: [
    'Bob Brown', 'Barbara Baker', 'Benjamin Brooks', 'Betty Bennett', 'Brian Butler',
    'Brenda Brown', 'Bradley Baker', 'Brittany Brooks', 'Bruce Bennett', 'Beth Butler',
    'Brandon Brown', 'Bonnie Baker', 'Blake Brooks', 'Beverly Bennett', 'Brett Butler',
    'Brooke Brown', 'Barry Baker', 'Brianna Brooks', 'Bernard Bennett', 'Bianca Butler'
  ],
  C: [
    'Carol Carter', 'Charles Clark', 'Christine Cooper', 'Christopher Collins', 'Cynthia Campbell',
    'Catherine Carter', 'Craig Clark', 'Cindy Cooper', 'Cody Collins', 'Claire Campbell',
    'Carl Carter', 'Crystal Clark', 'Connor Cooper', 'Chelsea Collins', 'Cameron Campbell',
    'Carla Carter', 'Corey Clark', 'Candice Cooper', 'Chad Collins', 'Caitlin Campbell'
  ],
  D: [
    'David Davis', 'Diana Dixon', 'Daniel Duncan', 'Deborah Daniels', 'Donald Douglas',
    'Diane Davis', 'Dennis Dixon', 'Dawn Duncan', 'Derek Daniels', 'Doris Douglas',
    'Dale Davis', 'Dana Dixon', 'Dustin Duncan', 'Darlene Daniels', 'Dwayne Douglas',
    'Daisy Davis', 'Dylan Dixon', 'Diana Duncan', 'Danny Daniels', 'Dolores Douglas'
  ],
  E: [
    'Elizabeth Evans', 'Edward Edwards', 'Emily Elliott', 'Eric Ellis', 'Evelyn Eaton',
    'Ethan Evans', 'Emma Edwards', 'Evan Elliott', 'Erica Ellis', 'Earl Eaton',
    'Ella Evans', 'Eugene Edwards', 'Eileen Elliott', 'Erik Ellis', 'Edith Eaton',
    'Evan Evans', 'Elaine Edwards', 'Ethan Elliott', 'Erika Ellis', 'Eugenia Eaton'
  ]
}

const getNamesByLetter = (letter: string) => {
  return namesData[letter as keyof typeof namesData] || []
}
</script>

<style lang="scss" scoped>
.sticky-demo {
  width: 100%;
  height: 100%;

  .container {
    margin: 0 auto;
  }

  .sticky-section {
    margin-bottom: 2rem;
    background-color: #e6f3ff;
    border-radius: 8px;
    position: relative;

    .sticky-header {
      position: sticky;
      top: 0;
      background-color: #4a90e2;
      color: white;
      z-index: 1;
      width: 100%;
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
      padding: 1rem;
    }

    .content {
      width: 100%;
      padding: 1rem;

      .name-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          padding: 1rem;
          padding-right: 0;
          border-bottom: 1px solid #e0e0e0;
          font-size: 1.1rem;
          transition: background-color 0.3s;

          &:hover {
            background-color: #d4e8ff;
          }

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>