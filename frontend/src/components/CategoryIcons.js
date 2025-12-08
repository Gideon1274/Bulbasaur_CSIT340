import { 
    faStar,           
    faLaptop,         
    faHeadphones,     
    faTshirt,         
    faGem,            
    faFutbol,         
    faHeartbeat,      
    faBlender,        
} from '@fortawesome/free-solid-svg-icons';

export const CATEGORIES = [
    { name: 'All Products', query: '', icon: faStar },
    { name: 'Electronics', query: 'Electronics', icon: faLaptop },
    { name: 'Accessories', query: 'Accessories', icon: faHeadphones },
    { name: 'Fashion', query: 'Fashion', icon: faTshirt },
    { name: 'Beauty', query: 'Beauty', icon: faGem },
    { name: 'Sports', query: 'Sports', icon: faFutbol },
    { name: 'Health', query: 'Health', icon: faHeartbeat },
    { name: 'Home Appliances', query: 'HomeAppliances', icon: faBlender },
];