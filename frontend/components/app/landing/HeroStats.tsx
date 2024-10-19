import { FocusCards } from "../../../components/ui/focus-cards";
//@ts-ignore
import hero1 from "../../../public/hero1.jpg";

export function HeroStats() {
  const cards = [
    {
      title: "Decentralized Governance",
      src: "https://twyg.co.za/wp-content/uploads/2022/12/Sinethemba-Masinga.jpeg",
      desc: "Empower communities to make decisions through transparent voting and proposal processes.",
    },
    {
      title: "Sustainable Agriculture",
      src: "https://thumbs.dreamstime.com/b/african-farmer-front-his-corn-plant-somehere-africa-landscape-togo-young-entrepreneur-cornfield-who-evolving-330299586.jpg",
      desc: "Contribute to collective funding pools that support sustainable farming projects.",
    },
    {
      title: "Community Funding",
      src: "https://media.istockphoto.com/id/2149567406/photo/full-length-senior-african-woman-looking-at-camera-with-traditional-hoe-in-corn-maize-field.jpg?s=612x612&w=0&k=20&c=_TDbveXoQfXEhZDS617-NioBs5LI7-7nLLAjvFoJP2s=",
      desc: "Promote eco-friendly practices that benefit farmers and the environment.",
    },
  ];

  //@ts-ignore
  return <FocusCards cards={cards} />;
}
