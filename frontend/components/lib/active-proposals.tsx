export interface Proposal {
  id: number;
  name: string;
  link: string;
  desc: string;
  team: string;
  target: number;
  walletAddress: string;
  socialUsername: string;
  otherLinks: string[];
  headerImageLink: string;
  category: "Livestock" | "Crop Production" | "Fish Farming" | "Other";
  moreDetails: string;
  active: boolean;
  authorNamespace: string;
  votes: number;
  raised: number;
}

const proposals: Proposal[] = [
  {
    id: 1,
    active: true,
    authorNamespace: "sylus.base",
    name: "Kimathi Fries Chicken",
    link: "https://kimathifries.com",
    desc: "Kimathi Fries Chicken is a proposal that seeks to start a poultry and fast restaurant in Dedan Kimathi Nyeri campus. The proposal is seeking to raise 100,000 KES to start the business.",
    team: "The team behind this proposal are two students from Dedan Kimathi University. One pursuing a degree in Computer Science and the other in Tourism. They have a passion for cooking and have been bootstrapping the business for the last 5 years using their educational loans.",
    target: 100000,
    walletAddress: "0x12345678uifedcjh5k21ehi90vn",
    socialUsername: "@KimathiFriesDkut",
    otherLinks: [
      "https://twitter.com/KimathiFriesDkut",
      "https://kimathifries.com",
    ],
    headerImageLink:
      "https://www.brighthope.org/wp-content/uploads/2022/07/Bright-Hope-Hope-for-Agnes-Facebook-Post.jpg",
    category: "Livestock",
    moreDetails:
      "The team behind this proposal are two students from Dedan Kimathi University. One pursuing a degree in Computer Science and the other in Tourism. They have a passion for cooking and have been bootstrapping the business for the last 5 years using their educational loans.",
    votes: 86,
    raised: 50000,
  },
  {
    id: 2,
    active: true,
    authorNamespace: "jane.doe.base",
    name: "Organic Veggie Farm",
    link: "https://organicveggies.com",
    desc: "This proposal aims to create an organic vegetable farm to promote healthy eating in the community. The funding goal is 200,000 KES for land preparation and seeds.",
    team: "Jane Doe and her family have been farming for generations and are now focusing on organic methods to produce high-quality vegetables.",
    target: 200000,
    walletAddress: "0x987654321abcdefg",
    socialUsername: "@OrganicVeggieJane",
    otherLinks: [
      "https://facebook.com/OrganicVeggieFarm",
      "https://organicveggies.com",
    ],
    headerImageLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi6QO2CqrqQlW-TgKJ2KR8H9NK7RbahWLmMQ&s",
    category: "Crop Production",
    moreDetails:
      "The team is committed to sustainable farming practices and aims to engage the local community in healthy eating habits through their organic produce.",
    votes: 55,
    raised: 0,
  },
  {
    id: 3,
    active: false,
    authorNamespace: "mark.smith.base",
    name: "Aquaculture Innovations",
    link: "https://aquacultureinnovations.com",
    desc: "This project focuses on establishing a sustainable fish farming operation that utilizes modern aquaculture techniques. The target funding is 150,000 KES.",
    team: "Mark Smith, an experienced fish farmer, aims to revolutionize local fish farming through technology and sustainable practices.",
    target: 150000,
    walletAddress: "0xabcdef1234567890",
    socialUsername: "@AquaInnovationsMark",
    otherLinks: [
      "https://linkedin.com/in/marksmith",
      "https://aquacultureinnovations.com",
    ],
    headerImageLink:
      "https://image.fishfarmingexpert.com/1150808.jpg?imageId=1150808&panox=0&panoy=0&panow=0&panoh=0&width=1200&height=683",
    category: "Fish Farming",
    moreDetails:
      "The project will provide jobs in the community and ensure a steady supply of quality fish to local markets. An NFT is a data file, stored on a type of digital ledger called a blockchain, which can be sold and traded. The NFT can be associated with a particular asset – digital or physical – such as an image, art, music, or recording of a sports event.",
    votes: 77,
    raised: 0,
  },
  {
    id: 4,
    active: true,
    authorNamespace: "mary.johnson.base",
    name: "Solar-Powered Greenhouse",
    link: "https://solar-greenhouse.com",
    desc: "This initiative seeks to build a solar-powered greenhouse to extend the growing season for various crops. The funding goal is 250,000 KES.",
    team: "Mary Johnson, an agricultural engineer, has teamed up with local farmers to implement innovative greenhouse technologies.",
    target: 250000,
    walletAddress: "0x1122334455667788",
    socialUsername: "@MarysGreenhouse",
    otherLinks: [
      "https://twitter.com/MarysGreenhouse",
      "https://solar-greenhouse.com",
    ],
    headerImageLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJkOGkN7mQvIu04EABTwf3L99xp67H1UoKJA&s",
    category: "Other",
    moreDetails:
      "The greenhouse will utilize renewable energy to reduce costs and environmental impact, providing fresh produce year-round. An NFT is a data file, stored on a type of digital ledger called a blockchain, which can be sold and traded. The NFT can be associated with a particular asset – digital or physical – such as an image, art, music, or recording of a sports event.",
    votes: 95,
    raised: 0,
  },
  {
    id: 5,
    active: false,
    authorNamespace: "tom.brown.base",
    name: "Livestock Feed Production",
    link: "https://livestockfeed.com",
    desc: "The project aims to establish a feed production facility to support local livestock farmers with quality feed at competitive prices. Target funding is 300,000 KES.",
    team: "Tom Brown, a local farmer and entrepreneur, has identified the need for reliable feed sources in the area.",
    target: 300000,
    walletAddress: "0x556677889900aabb",
    socialUsername: "@LivestockFeedTom",
    otherLinks: [
      "https://facebook.com/LivestockFeedProduction",
      "https://livestockfeed.com",
    ],
    headerImageLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC4u1WEzSu8japGW1KCiSUHscoqojvfdL3Mg&s",
    category: "Livestock",
    moreDetails:
      "This initiative will enhance local livestock production and contribute to the overall economy of the community.",
    votes: 100,
    raised: 0,
  },
  {
    id: 6,
    active: true,
    authorNamespace: "linda.white.base",
    name: "Agroforestry for Sustainability",
    link: "https://agroforestry.com",
    desc: "This project promotes agroforestry practices to improve land productivity and sustainability. The funding goal is 180,000 KES for planting and maintenance.",
    team: "Linda White, an environmental scientist, collaborates with farmers to implement sustainable land use practices.",
    target: 180000,
    walletAddress: "0x2233445566778899",
    socialUsername: "@AgroforestryLinda",
    otherLinks: [
      "https://instagram.com/AgroforestryLinda",
      "https://agroforestry.com",
    ],
    headerImageLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQat-zX6-Z9lzKma2Ro2t2owsMco-U_KY7XZg&s",
    category: "Other",
    moreDetails:
      "The project aims to create a sustainable farming model that benefits the environment and improves farmers' livelihoods. An NFT is a data file, stored on a type of digital ledger called a blockchain, which can be sold and traded. The NFT can be associated with a particular asset – digital or physical – such as an image, art, music, or recording of a sports event.",
    votes: 88,
    raised: 0,
  },
  {
    id: 7,
    active: false,
    authorNamespace: "peter.martin.base",
    name: "Herbal Medicine Cultivation",
    link: "https://herbalmedicines.com",
    desc: "This proposal seeks funding for the cultivation of medicinal herbs to promote traditional healing methods. The target funding is 120,000 KES.",
    team: "Peter Martin, a trained herbalist, wants to revive traditional medicine practices through sustainable farming.",
    target: 120000,
    walletAddress: "0x445566778899aabb",
    socialUsername: "@HerbalMedicinesPeter",
    otherLinks: [
      "https://twitter.com/HerbalMedicinesPeter",
      "https://herbalmedicines.com",
    ],
    headerImageLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzJvVFrBAhEE1N8QCpUrYkxFWjxpFtHpGhRw&s",
    category: "Crop Production",
    moreDetails:
      "The initiative will provide access to natural remedies and promote awareness of the benefits of herbal medicine. An NFT is a data file, stored on a type of digital ledger called a blockchain, which can be sold and traded. The NFT can be associated with a particular asset – digital or physical – such as an image, art, music, or recording of a sports event.",
    votes: 75,
    raised: 0,
  },
];

export default proposals;
