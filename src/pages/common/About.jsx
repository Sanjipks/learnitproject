import React from "react";

import classImg from "../../assets/images/class.jpg";

export default function About() {
  return (
    <div className="h-auto flex flex-col sm:items-center sm:mb-auto dark:bg-gray-700 dark:border-gray-800 bg-gray-400 border-gray-200 px-2">
      <section className="flex p-4 bg-gray-200 dark:bg-gray-700 md:max-w-screen-xl w-full sm:w-full sm:mt-16 sm:mb-4 border dark:border-gray-200 border-gray-800 rounded-xl">
        <div className=" flex flex-col items-center px-6 mx-auto lg:pt-6 xm:pt-16">
          <div className="flex mx-auto w-full justify-center sm:space-y-6 bg-gray-100 rounded-lg shadow dark:border md:mt-0 xm:max-w-sm md:max-w-md xl:p-0 dark:bg-gray-800">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-4 ">
              About Us
            </h1>
          </div>
          <img
            src={classImg ? classImg : null}
            className="my-8 rounded-md"
          ></img>
          <p className="xm:mb-8 dark:text-slate-300 text-slate-900 xxl:text-3xl text-wrap sm:mx-2 text-left font-serif  ">
            "At LearnIT, we are dedicated to empowering individuals through
            personalized IT education. Our consultancy stands out by offering
            one-on-one support, ensuring that each student receives tailored
            guidance that matches their unique learning style and pace. With a
            team of experienced IT professionals and educators, we provide a
            comprehensive range of classes that cover everything from basic
            computer skills to advanced programming and network security. Our
            mission is to make IT education accessible and engaging, helping
            students of all levels achieve their personal and professional
            goals. Whether you're looking to start a new career in tech, enhance
            your skills for a current role, or simply gain a better
            understanding of technology, LearnIT is here to support your journey
            every step of the way."
          </p>
        </div>
      </section>

      <section className="mb-16 bg-gray-200 dark:bg-gray-700 md:max-w-screen-xl w-full sm:w-full mt-8 sm:mt-2 rounded-xl border  dark:border-gray-200 border-gray-800">
        <div className=" flex flex-col items-center px-4 mx-auto lg:pt-6 xm:pt-16">
          <div className="flex mx-auto w-full justify-center  bg-gray-100 rounded-lg shadow dark:border md:mt-0 xm:max-w-sm md:max-w-md xl:p-0 dark:bg-gray-800">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-4 ">
              Goals
            </h1>
          </div>
          <div className="md:p-8 xm:p-2">
            <ul className=" dark:text-slate-300 list-disc  text-slate-900 xxl:text-3xl text-wrap sm:mx-2 text-left font-serif   ">
              <li className="m-4">
                Client Acquisition:
                <ul>
                  <li className="m-4 ">
                    Secure a certain number of new clients within the next 6
                    months.
                  </li>
                  <li className="m-4">
                    Develop partnerships with local businesses and
                    organizations.
                  </li>
                </ul>
              </li>
              <li className="m-4">
                Service Portfolio:
                <ul>
                  <li className="m-4">
                    Expand service offerings to include emerging technologies
                    like AI, machine learning, and cloud computing.
                  </li>
                  <li className="m-4">
                    Standardize and document consulting processes to ensure
                    consistent service delivery.
                  </li>
                </ul>
              </li>
              <li className="m-4">
                Marketing and Branding:
                <ul>
                  <li className="m-4">
                    Launch a targeted marketing campaign to increase brand
                    awareness.
                  </li>
                  <li className="m-4">
                    Develop and maintain an active social media presence.
                  </li>
                </ul>
              </li>
              <li className="m-4">
                Staff Training:
                <ul>
                  <li className="m-4">
                    Conduct regular training sessions for staff to keep them
                    updated with the latest industry trends and technologies.
                  </li>
                  <li className="m-4">
                    Encourage certifications and continuous learning.
                  </li>
                </ul>
              </li>

              <li className="m-4">
                Client Retention:
                <ul>
                  <li className="m-4">
                    Implement a customer satisfaction program to ensure high
                    levels of client satisfaction and retention.
                  </li>
                  <li className="m-4">
                    Develop and offer loyalty programs or discounts for
                    long-term clients.
                  </li>
                </ul>
              </li>
              <li className="m-4">
                Operational Efficiency:
                <ul>
                  <li className="m-4">
                    Invest in project management and CRM tools to streamline
                    operations.
                  </li>
                  <li className="m-4">
                    Develop a knowledge base for quick reference and
                    troubleshooting.
                  </li>
                </ul>
              </li>
              <li className="m-4">
                Market Expansion:
                <ul>
                  <li className="m-4">
                    Explore opportunities to expand services to new geographical
                    areas.
                  </li>
                  <li className="m-4">
                    Attend industry conferences and trade shows to network and
                    identify potential business opportunities.
                  </li>
                </ul>
              </li>
              <li className="m-4">
                Innovation:
                <ul>
                  <li className="m-4">
                    Set up a research and development team to explore and
                    implement innovative solutions.
                  </li>
                  <li className="m-4">
                    Pilot new technologies or methodologies in a controlled
                    environment before offering them to clients.
                  </li>
                </ul>
              </li>

              <li className="m-4">
                Industry Leadership:
                <ul>
                  <li className="m-4">
                    Position the company as a thought leader in the IT
                    consulting industry through whitepapers, webinars, and
                    speaking engagements.
                  </li>
                  <li className="m-4">
                    Develop proprietary tools or methodologies that set the
                    company apart from competitors.
                  </li>
                </ul>
              </li>
              <li className="m-4">
                Financial Growth:
                <ul>
                  <li className="m-4">
                    Achieve a specific annual revenue target within the next 5
                    years.
                  </li>
                  <li className="m-4">
                    Diversify revenue streams by offering managed services and
                    subscription-based products.
                  </li>
                </ul>
              </li>
              <li className="m-4">
                Sustainability:
                <ul>
                  <li className="m-4">
                    Implement sustainable business practices and aim for
                    certifications related to environmental and social
                    governance (ESG).
                  </li>
                  <li className="m-4">
                    Encourage remote work and virtual consulting to reduce the
                    company’s carbon footprint.
                  </li>
                </ul>
              </li>
              <li className="m-4">
                Community Engagement:
                <ul>
                  <li className="m-4">
                    Engage in community outreach programs and offer pro bono
                    services to non-profits or educational institutions.
                  </li>
                  <li className="m-4">
                    Develop internship and mentorship programs to support the
                    next generation of IT professionals.
                  </li>
                </ul>
              </li>
              <li className="m-4">
                Global Presence:
                <ul>
                  <li className="m-4">
                    Establish a global presence with offices or partnerships in
                    key international markets.
                  </li>
                  <li className="m-4">
                    Adapt services to meet the needs of diverse markets and
                    comply with international standards and regulations.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
