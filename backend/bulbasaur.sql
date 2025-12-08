-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bulbasaur
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

use heroku_438a1459e2f0fb4;

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `cart_id` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `fk_cart_product` (`product_id`),
  KEY `fk_cart_user` (`user_id`),
  CONSTRAINT `fk_cart_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `fk_cart_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (52,203,2),(53,204,2),(54,205,2),(55,1,2),(56,2,2),(57,152,2),(58,152,2),(156,189,1),(157,190,1),(159,192,1),(258,1,52),(259,1,52);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_seq`
--

DROP TABLE IF EXISTS `cart_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `cart_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_seq`
--

LOCK TABLES `cart_seq` WRITE;
/*!40000 ALTER TABLE `cart_seq` DISABLE KEYS */;
INSERT INTO `cart_seq` VALUES (351);
/*!40000 ALTER TABLE `cart_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` bigint NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `description` varchar(10000) DEFAULT NULL,
  `image_name` varchar(255) DEFAULT NULL,
  `price` float NOT NULL,
  `product_title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Dog','One (1) 36 lb. Bag - Purina ONE High Protein, Natural Dry Dog Food, True Instinct With Real Salmon & Tuna Salmon is number 1 ingredient in this dry dog food with tuna to help deliver 30 percent protein that helps support strong muscles, including a healthy heart Purina ONE natural dog food with added vitamins, minerals and nutrients crafted by a veterinarian-recommended brand in Purina-owned, U.S. facilities 100 percent nutrition for adult dogs, 0 percent fillers. Every ingredient has a purpose Dry dog food for skin and coat care includes omega-6 fatty acids and natural sources of glucosamine for joint health for dogs plus four antioxidant sources to help support a strong immune system','one',65.99,'Purina Natural Adult Dry Dog Food'),(2,'Dog','Contains one (1) PEDIGREE Complete Nutrition Adult Dry Dog Food Roasted Chicken, Rice & Vegetable Flavor Dog Kibble, 30 lb. Bonus Bag This dry food recipe helps maintain a healthy lifestyle with antioxidants, vitamins, and minerals, in the delicious chicken flavor dogs love Provides whole grains and helps support healthy digestion Delivers complete and balanced nutrition enriched with omega-6 fatty acids to help nourish your dog’s skin and coat Made in the USA with the World’s Finest Ingredients','pedigree',22.99,'Pedigree Dry Dog Food'),(152,'Dog','Contains one (1) 24 count case of 3.5 ounce easy peel trays of Cesar Wet Dog Food Poultry Variety Pack: (6) Duck Recipe, (6) Grilled Chicken Flavor, (6) Oven Roasted, Chicken Flavor, (6) Turkey Recipe Crafted without grains and with US Chicken, U.S., Turkey or Duck as the ingredient Cesar Wet Dog Food is complete and balanced and fortified with vitamins and minerals to help dogs of all sizes, especially small dog breeds, stay healthy Made in the USA with the world\'s finest ingredients, Cesar makes a great meal on its own or as a moist dog food topper mixed with dry food This gourmet dog food is served in convenient trays with easy, peel-away freshness seals','cesar',23.99,'Cesar Gourmet Wet Dog Food Variety Packs - 24 Trays'),(154,'Dog','SMALL BREED DOG FOOD: Royal Canin Small Breed Adult Dry Dog Food is precise nutrition specifically made for small dogs 10 months to 8 years old weighing 9–22 lb WEIGHT MAINTENANCE: L-carnitine helps maintain a healthy weight, while helping to meet the high energy needs of small dog breeds SKIN AND COAT HEALTH: Optimal levels of fatty acids like EPA and DHA support skin and a healthy dog coat SPECIALIZED KIBBLE: Small breed adult dog food has an exclusive kibble design adapted for miniature jaws GREAT FOR PICKY EATERS: Enhanced palatable dog food satisfies the fussy appetites of small dogs','royal',25.99,'Royal Canin Small Adult Dry Dog Food'),(155,'Dog','Real chicken is the #1 ingredient in this tasty blend of crunchy kibble and tender shreds Contains 26% protein and no artificial colors or flavors Omega-6 fatty acids support healthy skin, coat; antioxidant nutrients support healthy immune system Glucosamine supports healthy joints; prebiotic fiber supports digestive health Gradual transitioning helps to avoid dietary upsets. See instructions below or on the bag. Made in the USA, using domestic and globally sourced ingredients from trusted suppliers 30 LB bag of Wonder Bound Adult Dry Dog Food, Chicken & Brown Rice Recipe shredded blend','wonder',39.99,'Wonder Bound High Protein'),(156,'Dog','Avelora water bottle can hold max 19 ounces (550 ml) of water and 100 g food. It not only ensures dog drinking water easily but also cat, rabbit or other small pet to drinking water easily. You can put this bottle into your pocket, backpack or hanging on your hand with sling rope.','bottle',18.99,'Portable Dog Water Bottle with Food'),(157,'Dog','Avelora water bottle can hold max 19 ounces (550 ml) of water and 100 g food. It not only ensures dog drinking water easily but also cat, rabbit or other small pet to drinking water easily. You can put this bottle into your pocket, backpack or hanging on your hand with sling rope.','towel',18.99,'Absorbent Hooded Dog Bathrobe Towel'),(158,'Dog','Premium Quality: The Bricobe dog accessories are durable. The dog collar is strong enough that your dog cannot nibble and destroy it. The leash has a strong braided rope with a padded area for your holding. The dog food bowl is collapsible and can be changed to be of any size.','kit',19.99,'Walking Kit'),(159,'Dog','Light weight but sturdy --- 6.6 oz light weight that both adults and children can easily hold it. The light weight and ergonomic non-slip handle are designed to be held for long periods of time without fatigue. The leash consists of a high density strong nylon belt which has abrasion resistance.','leash',11.99,'Retractable Dog Leash'),(160,'Dog','PREMIUM QUALITY MATERIAL - Made of a durable dyed material making it the ideal bandanas for dogs, dual layer makes it long lasting, not like other low quality bandana with one layer only, our bandana he sewing machine work line is neat and straight. Breathable material, keeps your dog cool during those hot summer days. Machine wash and dry available. ONE SIZE FITS & FOLDABLE - Wedding dog bandana comes as a 18 x 18 inch Dog Bandana, which can be folded over multiple times. This dog bandana is ideal for small to medium size dogs.Please measure the size of your cutie and leave room to tie knot.','bandanas',12.99,'Dog Bandanas - 6PCS'),(161,'Dog','Treat your dog deliciously with the great taste of GREENIES Original Dental Treats GREENIES Dog Treats are proudly made in our Kansas City, MO, USA facility with the world’s finest ingredients GREENIES Dog Treats are made with natural ingredients plus vitamins, minerals, & nutrients','greenies',18.99,'Greenies Natural Dental Dog Treats'),(162,'Dog','Contains 25-ounce containers of Milk-Bone Soft and Chewy Beef and Filet Mignon Recipe With Chuck Roast dog treats Soft and chewy dog treats made with real chuck roast Fortified with 12 vitamins and minerals Great for dogs of all sizes','chewy',12.99,'Milk-Bone Soft & Chewy Dog Treats'),(163,'Cat','One (1) 22 Lb. Of Purina One Tender Selects With Real Salmon Real Salmon Is The #1 Ingredient High Protein Helps Support Strong Muscles Purina One Is Veterinarian Recommended 100% Complete And Balanced Nutrition To Help Support Your Adult Cat\'S Healthy Immune System','onecat',35.99,'Purina ONE Tender Selects Blend'),(164,'Cat','24 3 Ounce Cans Purina Fancy Feast Gravy Lovers Poultry and Beef Feast Collection Wet Cat Food Variety Pack Chicken, Turkey And Beef Flavors Cats Love 100 percent complete and balanced nutrition Tender, delicate bites for a tempting texture Meaty morsels deliver and appetizing texture Included Components: (24) 3 ounce Cans - Purina fancy feast wet cat food, medleys wild salmon Florentine with garden greens in delicate sauce','fancyfeast',18.99,'Purina Fancy Feast Gravy Lovers'),(165,'Cat','Contains twelve (12) 2.6 oz. twin pack trays (24 servings total) of SHEBA PERFECT PORTIONS Wet Cat Food Cuts in Gravy Variety Pack: (6) Roasted Chicken Entrée and (6) Tender Turkey Entrée Made with real protein, plus essential vitamins and minerals for any life stage, including mature cat maintenance and kitten growth','sheba',10.99,'Sheba Perfect Portions Cuts in Gravy'),(166,'Cat','Contains one (1) 22 lb. bag of IAMS Proactie Healthy Adult Dry Cat Food with Chicken Chicken is the ingredient in this nutrient-rich cat food designed for a healthy body for play Support your cat’s healthy digestion with natural fiber and prebiotics Promotes healthy skin and glossy coat with omega-6 and -3 fatty acids','iams',29.99,'Iams Proactive Health Adult Dry Cat Food'),(167,'Cat','One (1) 22 lb. Bag - Purina Friskies Dry Cat Food, Farm Favorites With Chicken Made with natural, farm-raised chicken Flavors of carrots and spinach add flavorful variety No artificial flavors Made without artificial preservative','friskies',20.99,'Purina Friskies Dry Cat Food'),(168,'Cat','SIZE DETAILS - S: 12.6*12inch, M: 15*13.4inch,L: 15.8*16inch The tent bed can accommodate most of the cat\'s body and provide a good sleeping experience for the cat. It’s ideal for indoor & outdoor use. Arrives as a vacuum packed bed! CLEANING RECOMMENDATIONS - Our cat bed is made of very good pp cotton, but due to the uneven shape of the cat bed cave, many users will break it after washing it with a washing machine. Therefore, for long-term use, we still recommend you to wash them by hand.','bed',16.99,'Cat Bed for Indoor with Anti-Slip Bottom'),(169,'Cat','Isolation of moisture and cold: The size is about 42x45x 23cm. Large enough to keep pets away from hot, cold or dirty floors while resting or sleeping. Simple maintenance: The lid can be removed. Drainage is also great. It dries quickly in the shade. It also has a higher drying speed than polyurethane and hard cotton.','bed2',16.99,'JUNSPOW Cat Bed'),(171,'Cat','Item Dimensions: Folded size 13 Expanded size : 13 H. Suggested Weight: 0-13lbs for small to medium cats, 0-10lbs for Dogs and puppies. Most Airline Approved under seat. Important: Please Check your airline requirements before traveling. Excellent Ventilation: 9 large Ventilation Holes on both sides and front, left and right ventilation nets ensure fresh air for fur-kids. The back expandable anti-scratching net provides maximum breathability that your pet will enjoy the outdoor time with you.','backpack',16.99,'Cat Carrier Backpack'),(172,'Cat','Cat Harness with Leash, Fits Large to XL Cats: Size measuring: Neck Girth: 11 - 13.7, Chest Girth: 18.0 - 20.0. Please Measure your cat carefully and refer to the size chart before order. (Tips: Your cat\'s head circumference should be at least 11 inches or your cat may slip out.) Package includes: 1x Small Cat Walking Vest and 1x Walking Nylon Leash (150cm)','harness',15.99,'Cat Harness'),(173,'Cat','ADJUSTABLE SIZE: Each cat collar measures adjustable 7.5 to 10.8, please measure your cat\'s neck girth before ordering, leave 2 fingers room when wearing for relaxation. SOFT POLYESTER COTTON: Made of soft and durable Polyester cotton material, makes your pet feel relaxed and comfortable when wearing, in addition, quick release buckle can provide more safety for your cat.','collar',9.99,'Cat Collar'),(174,'Cat','Cat Exercise Toy: 360 degree random rotation,drive cats wild as it starts,Increasing cat\'s exercise while keeping cats entertained and stimulated,eliminate boredom.Help satisfy your cat’s need for exercise Silent Motor: Quiet design can make sure that your pets would not be scared.Let you also have a quiet and comfortable environment.Great holiday gift for cat owners.Christmas gifts for cats Automatic Cat Toy: Make play and exercise moderate, It will automatically power off after 15 minutes of rotating, which can let your cat avoid to play and exercise excessively.It\'s a fun and playful way to keep cats healthy and active','toy',19.99,'Interactive Cat Toy for Indoor'),(175,'Cat','Cats Go Nuts – Make play fantastic with the 3 fluffy plush ball toys. The cat toys make lifelike animal chirping sounds once playtime begins, beckoning every bat, bite, chew, and chase! The 3 animal sounds are frog, cricket and bird chirping respectively. The balls keep quiet when left alone to save battery power','catnip',19.99,'Potaroma Chirping Cat Balls'),(176,'Fish','Provides balanced nutrition for daily feeding of fish living in a marine (saltwater) environment Contains Chlorella algae, which provides essential vitamins, minerals, amino acids required by marine fish Formulated with natural ingredients and colors with added vitamins, minerals and trace nutrients for a healthy diet Helps support a healthy immune system and bring out the true colors of your fish Feed in small amounts that fish will consume in under 2 minutes','marine',4.99,'Marine Flakes'),(177,'Fish','Provides necessary animal and vegetable proteins With 35% protein, fish meal is the first ingredient and supports tissue and muscle development Great for Koi, Goldfish and other pond fish Floating pond fish food that\'s suitable for all seasons Fish oil, wheat germ meal and alfalfa meal to enhance eye, heart and cognitive functions Highly digestible food','koi',64.99,'Kaytee Koi\'s Choice'),(178,'Fish','Natural ingredients and colors with added vitamins, minerals and trace nutrients Nutritious food ingredients that fish are naturally attracted to Formulated so that fish utilize more of what they eat and create less waste Floating flakes for surface feeding Will not cloud water when fed as directed Ideal for Angelfish, Tetra Species, Barb Species, Rasboras, Danios, White Cloud Minnows, Rainbow Fish, Fancy Guppies, Platies, Swordtails, Corydoras Catfish, Most Loaches, Kribensis','tropical',4.99,'Aqueon Tropical Flakes'),(179,'Fish','Ultra Natural Coloration Ultra-enhanced formulation of natural seaweed, Australian spirulina, and premium fresh sword prawns enhances the natural coloration of your fish, presenting them in their most natural and vibrant colors. PET SUPERFOOD It\'s not only tasty, but it also keeps guppies healthy! Our food is jam-packed with vitamins (A, C, D3, E, B1, B2, B6, B12) great for reaching full potential in size, color, fins, and A+ immunity!','guppy',7.99,'Ultra Fresh - Royal Guppy Mignon Pellet'),(180,'Fish','TROPICAL FORMULATION: TetraPro Tropical Color Crisps provide advanced nutrition for the discerning tropical fish-keeper. OPTIMAL HEALTH: Made with exclusive low-heat process that preserves essential vitamins and nutrients – enhanced with biotin to support fish’s immune system. COLOR ENHANCING: High content of natural color enhancers promote the development of rich, beautiful coloration in tropical fish.','tetra',8.99,'Tetra TetraPRO Tropical Color Crisps With Biotin'),(181,'Fish','DURABLE, STRONG, AND SAFE: Each fish net features a vinyl covered, two-part braided handle that provides for an ergonomic grip, ensuring reliable operation with its strong design. Our aquarium fish nets won’t bend or become distorted over time, even with repetitive use. The mesh netting is appropriate for almost any type of aquarium fish, both freshwater and saltwater.','fishnet',8.99,'PENN-PLAX Quick-Net Aquarium Fish Nets'),(182,'Fish','This 1.2 gallon semicircular fish tank can raise betta, angel fish, guppy and other ornamental fish. It is suitable for bedroom, living room, study and office, etc. The fish tank is equipped with 5W LED light and two decorative plastic aquatic plants. It will look great wherever you place it. Choose our fish tank, show your taste. This betta fish tank is made of impact-resistant acrylic with crystal-clear clarity. Beautiful arc design, both decoration and practicality. The one-piece construction providing superior strength and durability. Unlike glass tanks glued together with silicone, this small aquarium puts to rest any worries or concerns about possible leaks.','aquarium',32.99,'1.2 Gallon Aquarium'),(183,'Fish','Feed the fish no longer need to turn off the skimmer pump, Put food in the circle, the fish the fish will eat in own plate, fish Don\'t need to chase food everywhere,Improve feeding efficiency,Reduce fish food waste.','ring',6.99,'Fish Safe Floating Food Feeder'),(184,'Fish','1 Pc resin castle(5.7*3.1*4.9 inch) aquarium decorations with holes for small fish to hide, 1 blue aquarium decor tree(11.1*11.1 inch) and 10Pcs small artificial fish tank plants(1.9*1.9*1.8 inch).','plants',19.99,'Fish Tank Decorations Aquarium Plants'),(185,'Fish','Material: resin, non-toxic, will not harm your fish, will not fall off, will not fade, can be used in fresh water or salt water Size: 2.6 * 2.36 * 4.33 inches, weight: 7 ounces, suitable for small and medium fish tanks. Easy to use: Air stone can replace oxygen and reduce the content of carbon dioxide. You only need to manually connect the aviation pipe to the connection port of the air stone and deliver air, and it can be used normally. The package includes: 10 feet aviation pipe, 1 Groot bubble, 2 suction cups, 1 check valve, 1 T-connector and 1 air control valve. The whole set of accessories is enough to connect to the air pump.','toygroot',13.99,'AnxunJim Aquarium Groot Air Bubbler'),(186,'Fish','Mutli-functional cleaning kit: Aquarium gravel vacuum cleaner kit is a mufti-functional aquarium cleaner that uses (adopts)the siphon design principle, which includes the aquarium, aquarium sand washing, algae scraping, fish excrement cleaning, aquarium residual debris, and aquarium water changing. Quick water change gives fisha clean and comfortable aquarium living environment. Easy to use and assemble: when the fish tank siphon is in use, hold the handle and press it continuously for several times to observe whether it will automatically pump the water out. If not, repeat the operation until the water flows out, then stop the pressure, and secure it on the top of the tank , you will see the water automatically flows out. The Aquarium gravel cleaner kit is designed to be attached to the tank and has a flow regulator','tankcleaner',35.99,'QZQ Aquarium Gravel Cleaner'),(187,'Fish','SALT & FRESHWATER - Treatments during changes will help your betta, goldfish, or others thrive as it balances pH, adds electrolytes, slime and stress coats for your fish. Also safer for saltwater marine invertebrates, plants and crustaceans. DETOXIFIES & REMOVES HARMFUL CHEMICALS - Quick to remove harmful bacteria such as Ammonia, Nitrate, Chlorine, Chloramine, Heavy Metals, and more. Our \'Natural Choice\' Dechlorinator and clarifier does all this plus is safer for your aquarium. ALL-IN-ONE CONDITIONER - Makes your tap water instantly safe by removing harsh chemicals and detoxifies heavy metals. is so effective and safe it is also recommended for aqua live reefs. From beta fish to exotics, our treatment is great for all.','watercond',13.99,'Natural Rapport Aquarium Water Conditioner'),(188,'Hamster','Tasty apple and honey treat sticks your hamsters will love Triple baked for crunchiness and great taste Natural Wood stick center provides your bird with long lasting chewing fun','stick',5.99,'Vitakraft Crunch Sticks'),(189,'Hamster','Larger, crunchy pieces supports dental health through natural chewing activity Prebiotics and probiotics to support digestive health Naturally preserved for ideal freshness A nutritionally complete diet for hamsters and gerbils All natural','Fortidiet',5.99,'Kaytee Pro Health Hamster Food'),(190,'Hamster','A Nutritionally Balanced, Tasty Mix For Hamsters Promotes Natural Foraging Best Ever Taste - No Added Sugar Added Vitamins For Health & Vitality Suitable For All Breeds Including Dwarf Hamsters','farm',6.99,'Supreme Tiny Friends Farm Hazel Hamster Tasty Mix'),(191,'Hamster','Advanced Nutrition Diets In Flip Top Containers More Convenient Than Screw Top Containers IMPORTANT VARIETY: Unique mix of ingredients create an irresistible blend to replicate diets found in a natural habitat and encourage foraging behaviors. Less Mess Than Using Bags','wildharvest',9.99,'Wild Harvest Nutrition Diet'),(192,'Hamster','Daily diet for hamsters of all breeds, including dwarfs Rich in natural ingredients No added sugars Helps support digestive wellbeing Single component extruded nuggets prevent selective feeding Age range description: All Life Stages','complete',6.99,'Supreme Petfoods Science Selective Hamster Foods'),(193,'Hamster','ADJUSTABLE HEIGHT WATER BOTTLE HOLDER FOR GERBILS, HAMSTERS, AND RATS - With this adjustable bamboo stand, you can adjust the water bottle so that the sipper part can be between 1.2 inches to 3.7 inches off the ground. An easy to adjust butterfly nut at the back of the stand will ensure that you can customize the height of the water bottle and that the water bottle holder will securely lock in place.','bottles2',21.99,'4oz Small Pet Water Bottle with Bamboo Stand'),(194,'Hamster','Side Entrance: Observe the hamster\'s life without hindrance. Enclosed design to increase the time of hamster bathing. Large internal space so taht your pets could move around freely Easily Cleaning: Easy to remove the lid,arc design of the bottom can wash the dirty stuff away without effort Size: 5.7 inches long,3.9 inches wide,3.9 inches high. It\'s matched with a Sand Scoop which is random color. It\'s recommended for your dwarf hamsters gerbils mice or other small pets','sandbath',11.99,'Large Hamster Sand Bath Container'),(195,'Hamster','Size: 20 x 6 x 6cm; SUITABLE FOR SMALL Pet eg. Sugar glider, Squirrel, Hamster, Mouse and other small pets Pls check the size before you buy it. FUNCTION: It can be hung on the cage or used as a hammock.','bananabed',8.99,'Banana Hamster Bed House Hammock'),(196,'Hamster','Size: Rainbow house ( 5.9 x 5.9 x5.4 ), The snail house ( 6.3 x 3.9 x 3.9 ), Gym room（5.5x 3.1x 2.8），On the seesaw (5.7*2.6*1.5)perfect for hamsters, gerbils and mice and other small animal. Please check the size of your pet before ordering.','house',12.99,'Hamster Hiding House'),(197,'Hamster','Crystal Ball For Hamsters: Size: 4.72 Inches，Pets can play in the Crystal Ball For Hamsters, and the owner can observe the pet\'s every move. So cute!This is a small hamster ball, not suitable for larger pets. Environmentally Friendly Materials: Hamster exercise balls select high-quality environmentally friendly plastic materials to protect the health of pets well. It is produced with brand-new PC material, with lock design, easy installation, convenient and fast!','ball',7.99,'Hamster Running Ball'),(198,'Hamster','Enriching 18 Pcs Hamster Toys Set - OVERTANG as a professional pet toy accessories brand manufacturer, aiming to provide fun and anxiety relief for your small animals, our latest 18 pcs wooden hamster cage accessories toy playset contains: pine cone, apple tree block with rope, rattan ball, seesaw, carrot, corn, loofah slices, dumbbell, unicycle, bell, timothy hay sticks, various fun toys to win their hearts.','toyset',19.99,'18 Pcs Wooden Hamster Toy Set'),(199,'Hamster','Hamster chew and exercise toy set to meet the needs of your small pets more, the package contains: 100% apple branch 10PCS, volcanic rock molar stone 1PCS,Pine cones 2pcs,squared molar block with rope 1pcs,ladder 1pcs,corn shreds carrot 1PCS,Roman column 1pcs,swing 1pcs,corn shreds ball 1pcs, brown silk ball 1pcs,barbell 1pcs.','chewset',12.99,'21PCS Hamster Activity Chew Toys'),(200,'Bird','Nutritionally fortified gourmet food for parrots Kaytee is a Veterinarian Recommended Brand Omega 3\'s to support brain and heart health Antioxidants for general health and immune support Enhances skin & feather health for vibrant, healthy plumage Contains fruits, nuts, veggies and textures for nutritional variety','fiesta',63.99,'Kaytee Fiesta Parrot Food'),(201,'Bird','Natural seeds and grains Kaytee is a Veterinarian Recommended Brand No artificial colors or flavors High quality ingredients Naturally preserved for ideal freshness','supreme',59.99,'Kaytee Supreme Parrot Food'),(202,'Bird','Omega 3\'s to support Brain and Heart Health Kaytee is a Veterinarian Recommended Brand Enhances Skin & Feather health for vibrant, healthy plumage Prebiotics and probiotics to support digestive health 100% consumable extruded nutrition with no shells or seed hulls Naturally Preserved for ideal freshness','exact',42.99,'Kaytee Exact Rainbow Large Parrot Food'),(203,'Bird','NUTRITIONALLY COMPLETE FORAGING PARROT FOOD: formulated by top avian veterinarians and avian nutritionists; offers twice the foraging of pellets and the same complete nutrition SUPERIOR SHAPE FOR FORAGING: the round Nutri-Berrie shape offers important beak play and exercise, which helps prevent bird boredom and feather picking NON-GMO AND HUMAN-GRADE INGREDIENTS: no artificial colors, flavors, or preservatives','berries',32.99,'Lafeber\'s Nutri-Berries Parrot Food'),(204,'Bird','Premium & Clean Recipe: Uses all-natural ingredients. 100% natural with no fillers, sugars, or sulfites. Includes freeze dried fruits, organic whole grains, air dried vegetables, savory & healthy spices. Heath Benefits: Provides excellent health benefits to parrots Pearled barley has hearty increments of niacin, thiamine, and potassium. A substance that inhibits cholesterol production in the blood has been traced to the nonfibrous portion of the grain. Hulled Millet is rich in phosphorus, iron, calcium, riboflavin, the nutritional value of cooked millet.','birdstreet',19.99,'Bird Street Bistro Parrot Food'),(205,'Bird','The perfect bird carrier - lightweight, travel bag with bird perch and bird ball toy! This breathable, durable, lightweight travel bag is perfect for your bird! Easy to carry by handle or strap it onto your shoulders. Great for travel anywhere you go! Easy, set-up out of the box, ready to go on to the next adventure. This bird carrier has a double sided transparent window for your bird to enjoy the travel and for you to check on your bird on the go! With great ventilation, double zipper design, shoulder strap, handle and multiple perch placement for ease of use and safety for your bird. And, its super easy to clean. 17\'\' inches long, 10\'\' inches wide, 12\'\' inches high.','travelbag',33.99,'Bird Travel Bag'),(206,'Bird','Suitable Animals: The bird parrot nest hammock measures is about 9.8 x 11 and the diameter of the opening is 6.7, which is ideal for medium to large birds such as African Grey Cockatoos, budgerigars, cockatiel or various young Macaws. Besides, most small pets such as hamsters, bunnies, hedgehogs, etc. can also use it as a hiding place. High-quanlity Material: Made of soft and comfortable plush, it is safe enough for your pets. You can safely place them inside for warmth in the winter, and it\'s also great for when they have babies, without hurting their paws.','hammock',16.99,'Bird Parrot Nest Hammock with Double Hooks'),(207,'Bird','Package contains: you will get 1 pieces bird cage net cover in white color, which measures approx. 118 x 15 inch/ 300 x 37 cm in circumference and width, suitable for medium and small birdcages; Not recommend to be applied for large birdcages or extra large birdcages; Please confirm whether the size is suitable for your birdcage before buying Keep your house clean: the birdcage seed feather catcher can be applied for your bird cages, which can prevent the messy seeds and floating feathers from scattering on your house, keeping your house clean and tidy','cage',19.99,'Adjustable Bird Cage'),(208,'Bird','Comfort Corner:Create a hidden corner where birds can hide. While your birds are warm, they can also reduce the pressure of birds, provide them with a sense of security, and enjoy the fun of playing hide and seek with their owners.','corner',12.99,'Parrot Cage Snuggle Hut'),(209,'Bird','Large size: The size of our parrot nest is 11 × 11 × 11 inches. With huge cube design and circular opening, this large hanging bird house is very suitable for most large birds such as Amazon Parrot, African Gray, Cockatoo, Macaws and so on. Well Made : The big bird snuggle hut is made of high-quality thick coral fleece and cotton, which is soft , comfortable, cold-proof and warm-keeping. Parrot bed will keep the shape after wash.','box',19.99,'Large Size Parrot Nest House'),(210,'Bird','FOR LARGE BIRDS – The Bagel Cascade bird toy by Super Bird Creations is the perfect size for Amazons, African Greys, Eclectus, Small Cockatoos, Mini Macaws and similarly sized pet birds. DESIGN FEATURES – The Bagel Cascade bird toy is a favorite of many large birds. The durable plastic support core is packed with 24 fun to peel and chew compressed cardboard bagels this toy can easily be refilled with more bagels making it an economical and long lasting purchase.','toybird',16.99,'Bagel Cascade Bird Toy'),(211,'Bird','What you get :Package include 10 pieces difference type bird entertaining toys to meet your various needs for bird parrots,perfect size for parrotlets, parakeets, cockatiels, lovebirds and etc. Multi-function bird toy: they are designed to let your bird\'s feet have rest while also offer exercise opportunities for your birds to keep healthy and fit. Provides your little bird an ideal elevated place to swing, chew and climb.','toysetbird',18.99,'10 Packs Bird Swing Chewing Toys');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_seq`
--

DROP TABLE IF EXISTS `product_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_seq`
--

LOCK TABLES `product_seq` WRITE;
/*!40000 ALTER TABLE `product_seq` DISABLE KEYS */;
INSERT INTO `product_seq` VALUES (301);
/*!40000 ALTER TABLE `product_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'prince@gmail.com','Prince','Mecwan','abc'),(2,'sample@gmail.com','sample','sample','abc'),(52,'demo@gmail.com','Demo','Demo','abc');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_seq`
--

DROP TABLE IF EXISTS `user_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `user_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_seq`
--

LOCK TABLES `user_seq` WRITE;
/*!40000 ALTER TABLE `user_seq` DISABLE KEYS */;
INSERT INTO `user_seq` VALUES (151);
/*!40000 ALTER TABLE `user_seq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-04  2:41:50
