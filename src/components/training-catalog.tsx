import { ArrowDown } from "@/components/icons";
import { Eyebrow, SectionHeading } from "@/components/ui";

const modules = [
  { title: "Crop production & processing", duration: "4 months", fee: "₦300,000", topics: "Food and fodder crops, composting, irrigation, crop rotation, market gardening, plantation crops, forage conservation, drying and crop-product processing." },
  { title: "Poultry", duration: "3 months", fee: "₦300,000", topics: "Broilers, layers, local and improved chickens, turkeys and other poultry, housing, feeding, breeding and disease prevention." },
  { title: "Mammal production", duration: "2 months", fee: "₦250,000", topics: "Pig, cattle, sheep and goat production, animal handling, housing, nutrition, feed formulation, breeding and health management." },
  { title: "Micro-livestock & beekeeping", duration: "2 months", fee: "₦250,000", topics: "Rabbit, snail and grasscutter production, bee-hive management, housing, feeding, disease prevention and honey handling." },
  { title: "Fish farming", duration: "3 months", fee: "₦300,000", topics: "Pond construction and water quality, tilapia and catfish production, breeder care, and maggot production and processing." },
  { title: "Agro-food processing", duration: "2 months", fee: "₦350,000", topics: "Meat and fish processing, smoked products, snacks and pastries, juices, syrups, smoothies, preserves, yoghurt, cheese and ice cream." },
  { title: "Agribusiness", duration: "3 months", fee: "₦150,000", topics: "Business planning, marketing, financial education, natural-resource management, bookkeeping and basic computer skills." },
  { title: "Agricultural machinery", duration: "1 month", fee: "₦100,000", topics: "Safe equipment operation, care, maintenance and basic repairs, including forage equipment and tractor operation." },
];

export function TrainingCatalog() {
  return <section className="training-catalog section-pad" id="training">
    <div className="container">
      <SectionHeading eyebrow="Practical training proposal" title="From farm skills to agribusiness." body="The ASSETS proposal outlines hands-on production, processing and enterprise training developed with the University of Ibadan’s Department of Animal Science." />
      <div className="training-pathways">
        <article className="training-pathway training-pathway-featured" data-reveal>
          <Eyebrow>Broad agripreneur pathway</Eyebrow>
          <h3>Build skills across the farm.</h3>
          <p>Designed for people new to agriculture who want to develop an agribusiness. The proposal lists access to all production units at a discounted rate, with practical farm training, commercial-farm attachment and mentoring.</p>
          <div className="training-pathway-facts"><span><small>PROPOSED DURATION</small><strong>12–18 months*</strong></span><span><small>PROPOSED FEE</small><strong>₦1,250,000*</strong></span></div>
        </article>
        <article className="training-pathway" data-reveal>
          <Eyebrow>Specialist pathway</Eyebrow>
          <h3>Focus on one production unit.</h3>
          <p>Choose a specific area of agriculture and build skills through its dedicated module. Durations and proposal fees are listed below.</p>
          <div className="training-pathway-facts"><span><small>FORMAT</small><strong>Choose a module</strong></span><span><small>COMPLETION</small><strong>Certificate proposed</strong></span></div>
        </article>
      </div>

      <div className="training-modules-heading"><div><Eyebrow>Eight areas of learning</Eyebrow><h3>Explore the proposed modules</h3></div><span className="training-hint"><ArrowDown size={15} /> Select a topic to see what it covers</span></div>
      <div className="training-module-grid">
        {modules.map((module, index) => <details className="training-module" key={module.title} data-reveal>
          <summary><span className="training-module-number">{String(index + 1).padStart(2, "0")}</span><span className="training-module-title">{module.title}</span><span className="training-module-open" aria-hidden="true">+</span></summary>
          <p>{module.topics}</p>
          <div className="training-module-facts"><span>{module.duration}</span><strong>{module.fee}</strong></div>
        </details>)}
      </div>
      <p className="training-proposal-note">*Durations and fees are figures in the proposal, not confirmation of a currently open cohort. The documents list the broad pathway as both 12 months and 12–18 months. Please contact Ecclesia to confirm the current schedule, fees and availability. Optional field trips are not included in tuition. The proposal lists agribusiness training as required for loan consideration; financing is not guaranteed.</p>
    </div>
  </section>;
}
