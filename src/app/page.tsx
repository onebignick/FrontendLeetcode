import './globals.css';
import WelcomeCard from '@/components/homePage/WelcomeCard';
import CategoryCard from '@/components/homePage/CategoryCard';

export default function Home() {
  
  

  type CategoryDetails = Map<string, string>;
  type CategoryCardDetailsMap = Map<string, CategoryDetails>;

  const categoryCardDetailsMap : CategoryCardDetailsMap = new Map([
    ["html", new Map([
      ["description", "Craft the skeleton of the web with HTML!"],
      ["callToAction", "Start Coding HTML"],
      ["callToActionUrl", "/questions/filteredbydescription/HTML"],
    ])],
    ["css", new Map([
      ["description", "Come help center a div"],
      ["callToAction", "Start Coding CSS"],
      ["callToActionUrl", "/questions/filteredbydescription/CSS"],
    ])],
    ["javascript", new Map([
      ["description", "Become a DOM manipulator"],
      ["callToAction", "Start Coding JS"],
      ["callToActionUrl", "/questions/filteredbydescription/Javascript"],
    ])]
  ]);

  const categoriesToDisplay: string[] = Array.from(categoryCardDetailsMap.keys());

  return (
    <main className="px-5 lg:px-10 xl:px-15 py-5">
      <WelcomeCard />
      <div className='pt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:px-10 lg:px-20'>
        {categoriesToDisplay.map((category, index) => (
          <div className='h-full'>
            <CategoryCard
              key={index}
              category={category}
              description={categoryCardDetailsMap.get(category)?.get("description") || ""}
              callToAction={categoryCardDetailsMap.get(category)?.get("callToAction") || ""}
              callToActionUrl={categoryCardDetailsMap.get(category)?.get("callToActionUrl") || ""}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
