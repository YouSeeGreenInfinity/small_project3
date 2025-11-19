// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.bulkInsert(
//       'Cats',
//       [
//         {
//           name: 'Leonardo',
//           img: 'https://skooncatlitter.com/blog/wp-content/uploads/2021/08/blog-COVER-2000x1200px-1-1.jpg',
//         },
//         {
//           name: 'Maximilian',
//           img: 'https://media.istockphoto.com/id/1323742842/photo/funny-cat-in-sunglasses-cat-with-glasses-on-a-light-blue-clean-sunny-background-funny-pets.jpg?s=612x612&w=0&k=20&c=lJP4Lh8ZzUO8o9NlYTVRDT91Hvcddm8T-FDxVlUkxwQ=',
//         },
//         {
//           name: 'Alfonso',
//           img: 'https://t4.ftcdn.net/jpg/02/11/25/91/360_F_211259199_n0LBMIpx3FGIsKjqQHt7g8u3pjH2i9OL.jpg',
//         },
//         {
//           name: 'Benedict',
//           img: 'https://img.freepik.com/premium-photo/cute-white-british-cat-wearing-sunglasses-yellow-fabric-hammock-isolated-yellow-background_175994-4065.jpg',
//         },
//         {
//           name: 'Barnaby',
//           img: 'https://t3.ftcdn.net/jpg/06/35/65/42/360_F_635654260_iH1acakl3Vfo6dllAHeeCMIAHAjEb2ZO.jpg',
//         },
//         {
//           name: 'Alastair',
//           img: 'https://img.freepik.com/premium-photo/cool-cat-wearing-sun-glasses-beach-generative-ai_849906-1803.jpg',
//         },
//       ],
//       {},
//     );
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('Cats', null, {});
//   },
// };

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Cats',
      [
        {
          name: 'Leonardo',
          img: 'https://skooncatlitter.com/blog/wp-content/uploads/2021/08/blog-COVER-2000x1200px-1-1.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Maximilian',
          img: 'https://media.istockphoto.com/id/1323742842/photo/funny-cat-in-sunglasses-cat-with-glasses-on-a-light-blue-clean-sunny-background-funny-pets.jpg?s=612x612&w=0&k=20&c=lJP4Lh8ZzUO8o9NlYTVRDT91Hvcddm8T-FDxVlUkxwQ=',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Alfonso',
          img: 'https://t4.ftcdn.net/japg/02/11/25/91/360_F_211259199_n0LBMIpx3FGIsKjqQHt7g8u3pjH2i9OL.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Benedict',
          img: 'https://img.freepik.com/premium-photo/cute-white-british-cat-wearing-sunglasses-yellow-fabric-hammock-isolated-yellow-background_175994-4065.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Barnaby',
          img: 'https://t3.ftcdn.net/japg/06/35/65/42/360_F_635654260_iH1acakl3Vfo6dllAHeeCMIAHAjEb2ZO.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Alastair',
          img: 'https://img.freepik.com/premium-photo/cool-cat-wearing-sun-glasses-beach-generative-ai_849906-1803.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cats', null, {});
  },
};