
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Features } from "@/components/Features";
import { ProductGrid } from "@/components/ProductGrid";
import { SellForm } from "@/components/SellForm";
import { Contact } from "@/components/Contact";
import { PaymentModal } from "@/components/PaymentModal";
import { BillSection } from "@/components/BillSection";
import { Chatbot } from "@/components/Chatbot";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  alt: string;
}

export interface BillItem {
  name: string;
  quantity: number;
  unit: string;
  price: number;
  totalPrice: number;
}

const initialProducts: Product[] = [
  { id: 1, name: "Fresh Apples", description: "Juicy red apples from organic farms.", price: 150, quantity: 10, category: "Fruits", image: "https://cdn.cosmicjs.com/b3b63ba0-edc8-11ed-9381-c7e88b094f1e-pexels-matheus-cenali-2487443.jpg", alt: "Close-up of ripe red apples on a tree" },
  { id: 2, name: "Organic Tomatoes", description: "Ripe tomatoes grown without pesticides.", price: 60, quantity: 15, category: "Vegetables", image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?cs=srgb&dl=pexels-julia-nagy-568948-1327838.jpg&fm=jpg", alt: "Fresh red tomatoes on a wooden surface" },
  { id: 3, name: "Mangoes", description: "Sweet Alphonso mangoes from local orchards.", price: 200, quantity: 8, category: "Fruits", image: "https://media.istockphoto.com/id/641924940/photo/mangoes-composition-background.jpg?s=612x612&w=0&k=20&c=N60vzAI16zJxKZC2Gm7O_xrLUduBIsKEhJg-73_1jSU=", alt: "Ripe yellow mangoes on a branch" },
  { id: 4, name: "Potatoes", description: "Freshly harvested potatoes for all dishes.", price: 40, quantity: 20, category: "Vegetables", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655", alt: "Whole and sliced potatoes on a table" },
  { id: 5, name: "Cow Milk", description: "Pure, unprocessed cow milk.", price: 50, quantity: 25, category: "Dairy", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpyAiJzuNgPI1sGfPA89xG3mrzNoEqLVS3vA&s", alt: "Glass bottle of fresh cow milk on a rustic table" },
  { id: 6, name: "Organic Compost", description: "Nutrient-rich compost for soil health.", price: 100, quantity: 50, category: "Manure", image: "https://img.freepik.com/free-photo/composition-compost-made-rotten-food_23-2149073816.jpg?ga=GA1.1.1948085246.1748018989&semt=ais_hybrid&w=740", alt: "Heap of dark organic compost in a garden" },
  { id: 7, name: "Bananas", description: "Ripe yellow bananas, naturally grown.", price: 50, quantity: 12, category: "Fruits", image: "https://img.freepik.com/free-photo/bananas-white-background_1187-1671.jpg?ga=GA1.1.1948085246.1748018989&semt=ais_hybrid&w=740", alt: "Bunch of ripe yellow bananas" },
  { id: 8, name: "Carrots", description: "Crunchy carrots, rich in vitamins.", price: 45, quantity: 18, category: "Vegetables", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37", alt: "Fresh orange carrots with green tops" },
  { id: 9, name: "Cheddar Cheese", description: "Aged cheddar from local dairies.", price: 300, quantity: 5, category: "Dairy", image: "https://img.freepik.com/free-photo/front-view-sliced-fresh-cheese-light-snack-color-photo-food-breakfast_140725-93148.jpg?ga=GA1.1.1948085246.1748018989&semt=ais_hybrid&w=740", alt: "Block of aged cheddar cheese on a cutting board" },
  { id: 10, name: "NPK Fertilizer", description: "Balanced fertilizer for crop growth.", price: 150, quantity: 30, category: "Fertilizers", image: "https://img.freepik.com/free-photo/hemp-seeds_1368-5489.jpg?ga=GA1.1.1948085246.1748018989&semt=ais_hybrid&w=740", alt: "Bag of NPK fertilizer granules in a field" },
  { id: 11, name: "Oranges", description: "Juicy oranges packed with vitamin C.", price: 80, quantity: 15, category: "Fruits", image: "https://img.freepik.com/free-photo/close-up-wet-juicy-ripe-oranges_23-2147920850.jpg?ga=GA1.1.1948085246.1748018989&semt=ais_hybrid&w=740", alt: "Fresh oranges on a tree branch" },
  { id: 12, name: "Spinach", description: "Fresh green spinach for healthy meals.", price: 30, quantity: 10, category: "Vegetables", image: "https://img.freepik.com/free-photo/close-up-photo-fresh-spinach_176420-7294.jpg?ga=GA1.1.1948085246.1748018989&semt=ais_hybrid&w=740", alt: "Fresh green spinach leaves in a bowl" },
  { id: 13, name: "Butter", description: "Creamy butter made from fresh cream.", price: 200, quantity: 8, category: "Dairy", image: "https://img.freepik.com/premium-photo/tasty-butter-light-wooden-table-closeup_495423-82956.jpg?ga=GA1.1.1948085246.1748018989&semt=ais_hybrid&w=740", alt: "Block of creamy butter on a wooden table" },
  { id: 14, name: "Vermicompost", description: "Organic manure from earthworm castings.", price: 120, quantity: 40, category: "Manure", image: "https://img.freepik.com/free-photo/closeup-picture-gardener-s-hands-planting-plant_1150-26616.jpg?ga=GA1.1.1948085246.1748018989&semt=ais_hybrid&w=740", alt: "Rich vermicompost with earthworms in soil" },
  { id: 15, name: "Grapes", description: "Sweet black grapes, seedless variety.", price: 120, quantity: 10, category: "Fruits", image: "https://img.freepik.com/free-photo/delicious-bunch-grapes_1203-1891.jpg?ga=GA1.1.1948085246.1748018989&semt=ais_hybrid&w=740", alt: "Clusters of dark seedless grapes" },
  { id: 16, name: "Onions", description: "Fresh red onions for cooking.", price: 35, quantity: 25, category: "Vegetables", image: "https://img.freepik.com/free-photo/close-up-view-whole-red-onions-white-background_141793-5440.jpg?ga=GA1.1.1948085246.1748018989&semt=ais_hybrid&w=740", alt: "Whole and sliced red onions on a surface" },
  { id: 17, name: "Yogurt", description: "Probiotic-rich homemade yogurt.", price: 80, quantity: 12, category: "Dairy", image: "https://img.freepik.com/free-photo/greek-yogurt-wooden-bowl-isolated-white-background_123827-22632.jpg?ga=GA1.1.1948085246.1748018989&semt=ais_hybrid&w=740", alt: "Bowl of creamy homemade yogurt with a spoon" },
  { id: 18, name: "Urea Fertilizer", description: "High-nitrogen fertilizer for plants.", price: 90, quantity: 50, category: "Fertilizers", image: "https://img.freepik.com/free-vector/set-bottle-bags-with-fertilizer-gardening_1284-46446.jpg?ga=GA1.1.1948085246.1748018989&semt=ais_hybrid&w=740", alt: "White urea fertilizer granules in a sack" },
  { id: 19, name: "Pineapples", description: "Tropical pineapples, sweet and tangy.", price: 100, quantity: 8, category: "Fruits", image: "https://img.freepik.com/free-photo/pineapple-fruit_1203-7746.jpg?ga=GA1.1.1948085246.1748018989&semt=ais_hybrid&w=740", alt: "Whole and sliced ripe pineapples" },
  { id: 20, name: "Cucumbers", description: "Crisp cucumbers for salads.", price: 40, quantity: 15, category: "Vegetables", image: "https://img.freepik.com/free-photo/fresh-cucumbers-sliced-dark-background_1150-45029.jpg?ga=GA1.1.1948085246.1748018989&semt=ais_hybrid&w=740", alt: "Fresh green cucumbers on a table" }
];

const Index = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);

  const addToBill = (productId: number, quantity: number, unit: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const requestedQuantityKg = unit === 'g' ? quantity / 1000 : quantity;

    if (requestedQuantityKg > product.quantity) {
      alert(`Sorry, only ${product.quantity.toFixed(2)}kg of ${product.name} is available.`);
      return;
    }

    // Update product quantity
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, quantity: p.quantity - requestedQuantityKg }
        : p
    ));

    const totalPrice = requestedQuantityKg * product.price;

    setBillItems(prev => [...prev, {
      name: product.name,
      quantity: quantity,
      unit: unit,
      price: product.price,
      totalPrice: totalPrice
    }]);
  };

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProduct,
      id: products.length + 1,
      image: `https://source.unsplash.com/random/300x200/?${newProduct.category.toLowerCase()}`,
      alt: `Fresh ${newProduct.name.toLowerCase()} from local farms`
    };
    setProducts(prev => [...prev, product]);
  };

  const proceedToPayment = (total: number) => {
    setGrandTotal(total);
    setShowPaymentModal(true);
  };

  const completePayment = () => {
    setShowPaymentModal(false);
    setBillItems([]);
    alert("Payment completed successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        <Hero />
        <About />
        <Features />
        
        <section id="buy" className="py-16 px-4 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-800">{t('buy.title')}</h2>
          <ProductGrid products={products} onAddToBill={addToBill} />
          {billItems.length > 0 && (
            <BillSection billItems={billItems} onProceedToPayment={proceedToPayment} />
          )}
        </section>

        <SellForm onAddProduct={addProduct} />
        <Contact />
      </main>

      <footer className="bg-green-800 text-white text-center py-8">
        <p>{t('footer.copyright')}</p>
      </footer>

      <PaymentModal 
        isOpen={showPaymentModal}
        grandTotal={grandTotal}
        onClose={() => setShowPaymentModal(false)}
        onComplete={completePayment}
      />
      
      <Chatbot />
    </div>
  );
};

export default Index;
