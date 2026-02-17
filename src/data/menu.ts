// Menu Data - Casa do Brasil
// Centralized menu structure for the restaurant website

import { assetPath } from '../lib/utils';

export interface MenuItem {
  name: string;
  nameEn?: string;
  description?: string;
  descriptionEn?: string;
  price: string;
  subtitle?: string;
  subtitleEn?: string;
  details?: string[];
  detailsEn?: string[];
}

export interface MenuSubSection {
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  ctaText?: string;
  ctaTextEn?: string;
  items: MenuItem[];
  layout?: 'list' | 'grid';
}

export interface MenuCategory {
  id: string;
  nameHe: string;
  nameEn: string;
  image: string;
  subSections?: MenuSubSection[];
  items?: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "churrascaria",
    nameHe: "צ'ורוסקריה",
    nameEn: "Churrascaria",
    image: assetPath("meat-1.jpg"),
    subSections: [
      {
        title: "מנות פתיחה המוגשות למרכז השולחן",
        titleEn: "Starter dishes served to the center of the table",
        description: "אורז ברזילאי לבן, תבשיל צ'ילי קונקרנה-בשר, שעועית ופלפלים המתבשלים בבישול איטי ומסורתי, תפו\"א אפויים בעשבי תיבול, סלט הבית ברוטב וויניגרט ורוטב צ'ימיצ'ורי",
        descriptionEn: "White Brazilian rice, chili con carne, beans and peppers slow-cooked traditionally, herb-roasted potatoes, house salad with vinaigrette and chimichurri sauce",
        ctaText: "כמה שבא לך!",
        ctaTextEn: "As much as you want!",
        layout: "grid",
        items: [
          {
            name: "צ'ורוסקריה קאזה דו ברזיל - 11",
            nameEn: "Churrascaria Casa do Brasil - 11",
            subtitle: "סוגי בשר",
            subtitleEn: "Types of meat",
            price: "₪259",
            details: [
              "פיקאניה, אסאדו, דנבר קאט, פילה מיניון, ממיה קווין אוף ביף",
              "ירך עוף במרינדת סויה, דבש ויין לבן",
              "אנטריקוט, כנפי עוף צ'ילי"
            ],
            detailsEn: [
              "Picanha, asado, denver cut, filet mignon, queen of beef",
              "Chicken thigh in soy, honey and white wine marinade",
              "Ribeye, chili chicken wings"
            ],
          },
          {
            name: "צ'ורוסקריה פרימיום - 12",
            nameEn: "Churrascaria Premium - 12",
            subtitle: "סוגי בשר",
            subtitleEn: "Types of meat",
            price: "₪289",
            details: [
              "אנטריקוט מובחר ומיושן, פיקאניה, אסאדו, דנבר קאט",
              "פילה מיניון, ממיה קווין אוף ביף",
              "ירך עוף במרינדת סויה, דבש ויין לבן"
            ],
            detailsEn: [
              "Select aged ribeye, picanha, asado, denver cut",
              "Filet mignon, queen of beef",
              "Chicken thigh in soy, honey and white wine marinade"
            ],
          },
        ],
      },
    ],
  },
  {
    id: "main",
    nameHe: "עיקריות",
    nameEn: "Main Courses",
    image: assetPath("meat-2.jpg"),
    items: [
      { name: "אנטריקוט", nameEn: "Ribeye", description: "500/300 גרם מובחר ומיושן, עשוי על הגריל. + מדליון כבד אווז (100 גרם) - ₪70", descriptionEn: "500/300g select aged, grilled. + Foie gras medallion (100g) - ₪70", price: "₪239/179" },
      { name: "פיקאניה", nameEn: "Picanha", description: "300 גרם, מנתח ברזילאי מובחר, צרוב על הגריל. + מדליון כבד אווז (100 גרם) - ₪70", descriptionEn: "300g select Brazilian cut, charred on the grill. + Foie gras medallion (100g) - ₪70", price: "₪175" },
      { name: "סינטה", nameEn: "Sirloin", description: "300 גרם, מנתח בקר מובחר ומיושן, מידת עשייה M. + מדליון כבד אווז (100 גרם) - ₪70", descriptionEn: "300g select aged beef, medium. + Foie gras medallion (100g) - ₪70", price: "₪175" },
      { name: "מדליוני פילה בקר", nameEn: "Beef tenderloin medallions", description: "300 גרם, מנתח מובחר ומיושן, עשוי על הגריל", descriptionEn: "300g select aged cut, grilled", price: "₪184" },
      { name: "פילה רוסיני", nameEn: "Tournedos Rossini", description: "מדליוני פילה בקר וכבד אווז, צרובים על הפלנצ'ה, מוגש עם ריבת עגבניות שרי", descriptionEn: "Beef tenderloin and foie gras medallions, seared, served with cherry tomato jam", price: "₪264" },
      { name: "טורנדו", nameEn: "Tournedos", description: "חגיגת בשרים: אנטריקוט, מדליון פילה בקר, מדליון כבד אווז", descriptionEn: "Meat celebration: ribeye, beef tenderloin medallion, foie gras medallion", price: "₪295" },
      { name: "כבד אווז צרוב", nameEn: "Seared foie gras", description: "מוגש על בריוש ביתי עם ריבת עגבניות שרי", descriptionEn: "Served on house brioche with cherry tomato jam", price: "₪220" },
      { name: "צלעות טלה מיושנות", nameEn: "Aged lamb ribs", description: "450 גרם, על הגריל", descriptionEn: "450g, on the grill", price: "₪189" },
      { name: "חזה מולרד", nameEn: "Duck breast", description: "350 גרם", descriptionEn: "350g", price: "₪169" },
      { name: "בוליניו - קציצות בקר ברזילאיות", nameEn: "Bolinho - Brazilian beef meatballs", description: "300 גרם", descriptionEn: "300g", price: "₪139" },
      { name: "צ'וריסוס - נקניקיות בקר דרום אמריקאיות", nameEn: "Chorizo - South American beef sausages", description: "300 גרם", descriptionEn: "300g", price: "₪139" },
      { name: "פרגיות", nameEn: "Chicken breast", description: "300 גרם במרינדה", descriptionEn: "300g marinated", price: "₪129" },
      { name: "המבורגר \"קאזה דו ברזיל\"", nameEn: "Casa do Brasil Burger", description: "300 גרם בשר בקר משובח, בליווי צ'יפס וירקות טריים + מנות פתיחה המוגשות למרכז השולחן", descriptionEn: "300g premium beef, with fries and fresh vegetables + starter dishes to the center", price: "₪108" },
      { name: "טבע בורגר \"קאזה דו ברזיל\"", nameEn: "Nature Burger Casa do Brasil", description: "בליווי צ'יפס וירקות טריים + מנות פתיחה המוגשות למרכז השולחן", descriptionEn: "With fries and fresh vegetables + starter dishes to the center", price: "₪89" },
      { name: "דג דניס שלם טרי", nameEn: "Whole fresh sea bream", description: "על הגריל", descriptionEn: "On the grill", price: "₪139" },
      { name: "פילה סלמון", nameEn: "Salmon fillet", description: "אפוי בתנור, עם ירקות מוקפצים בליווי קרם שמנת", descriptionEn: "Oven-baked, with stir-fried vegetables and cream sauce", price: "₪139" },
      { name: "רביולי בטעמים", nameEn: "Flavored ravioli", description: "במבחר טעמים - שמנת פטריות / שמנת / רוזה", descriptionEn: "In flavors - mushroom cream / cream / rosa", price: "₪89" },
      { name: "פסטה פטוצ'יני", nameEn: "Fettuccine pasta", description: "בעבודת יד במבחר רטבים: נפוליטנה / שמנת / רוזה / שמנת פטריות", descriptionEn: "Handmade with sauces: napolitana / cream / rosa / mushroom cream", price: "₪85" },
      { name: "פטוצ'יני סלמון", nameEn: "Fettuccine salmon", description: "פסטה שמנת עם קוביות של פילה סלמון", descriptionEn: "Cream pasta with salmon fillet cubes", price: "₪119" },
      { name: "סלט יווני", nameEn: "Greek salad", description: "חסה, מלפפון, גמבה, עגבניות, בצל סגול, קרוטונים, זיתי קלמטה, זעתר, גבינה בולגרית", descriptionEn: "Lettuce, cucumber, bell pepper, tomatoes, purple onion, croutons, Kalamata olives, za\'atar, Bulgarian cheese", price: "₪85" },
      { name: "לחם הבית בליווי מטבלים", nameEn: "House bread with dips", description: "", descriptionEn: "", price: "₪29" },
    ],
  },
  {
    id: "kids",
    nameHe: "נבחרת הילדים",
    nameEn: "Kids' Favorites",
    image: assetPath("meat-1.jpg"),
    items: [
      { name: "מנת ילדים", nameEn: "Kids meal", description: "מנות מותאמות לילדים", descriptionEn: "Dishes suited for children", price: "מחיר לפי מנה" },
    ],
  },
  {
    id: "meat",
    nameHe: "בשר טרי במשקל",
    nameEn: "Fresh Meat by Weight",
    image: assetPath("meat-2.jpg"),
    items: [
      { name: "בשר טרי במשקל", nameEn: "Fresh meat by weight", description: "נתחי בשר מובחרים ומיושנים בקצביית הבית", descriptionEn: "Select aged cuts from our in-house butcher", price: "מחיר לפי משקל" },
    ],
  },
  {
    id: "desserts",
    nameHe: "קינוחים",
    nameEn: "Desserts",
    image: "/caipirinha.jpg",
    items: [
      { name: "קינוח בהפתעה", nameEn: "Surprise dessert", description: "קינוח מתחלף - שאל את המלצר", descriptionEn: "Rotating dessert - ask your server", price: "₪52" },
      { name: "קרם ברולה", nameEn: "Crème brûlée", description: "קרם שמנת עם שבבי מקלות וניל, בציפוי סוכר מקורמל", descriptionEn: "Cream with vanilla bean chips, caramelized sugar topping", price: "₪53" },
    ],
  },
  {
    id: "business",
    nameHe: "עסקיות",
    nameEn: "Business Meals",
    image: assetPath("grill.jpg"),
    items: [
      { name: "מנות עסקיות", nameEn: "Business meals", description: "מבחר מנות מיוחדות לאירועים עסקיים", descriptionEn: "Selection of special dishes for business events", price: "מחיר לפי מנה" },
    ],
  },
];
