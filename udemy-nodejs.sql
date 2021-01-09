-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2021 at 02:20 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `udemy-nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `cartitems`
--

CREATE TABLE `cartitems` (
  `id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `cartId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cartitems`
--

INSERT INTO `cartitems` (`id`, `quantity`, `createdAt`, `updatedAt`, `cartId`, `productId`) VALUES
(2, 1, '2020-04-19 15:53:02', '2020-04-19 15:53:02', 1, 2),
(3, 2, '2020-04-19 15:53:06', '2020-04-19 15:53:08', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, '2020-04-19 13:35:27', '2020-04-19 13:35:27', 1),
(2, '2020-04-19 15:44:49', '2020-04-19 15:44:49', 1),
(3, '2020-04-19 15:46:52', '2020-04-19 15:46:52', 1),
(4, '2020-04-19 15:48:08', '2020-04-19 15:48:08', 1),
(5, '2020-04-19 15:55:34', '2020-04-19 15:55:34', 1),
(6, '2020-04-19 15:55:38', '2020-04-19 15:55:38', 1),
(7, '2020-04-19 16:18:36', '2020-04-19 16:18:36', 1),
(8, '2020-04-26 15:49:18', '2020-04-26 15:49:18', 1),
(9, '2020-04-26 16:44:14', '2020-04-26 16:44:14', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`id`, `quantity`, `createdAt`, `updatedAt`, `orderId`, `productId`) VALUES
(1, 1, '2020-04-19 15:52:22', '2020-04-19 15:52:22', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, '2020-04-19 15:52:22', '2020-04-19 15:52:22', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `price`, `imageUrl`, `description`, `createdAt`, `updatedAt`, `userId`) VALUES
(2, 'Nailcutter', 123, 'https://www.danielwellington.com/media/staticbucket/media/catalog/product/d/w/dw-petite-st-mawes-rg-cat.png?ecom2=true&format=jpg&canvas=1:1&width=400&quality=80&bg-color=ffffff', 'Loren ipsum Loren ipsum Loren ipsum Loren ipsum ', '2020-04-19 13:38:25', '2020-04-19 13:38:25', 1),
(3, 'ThePetShop', 545, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvXYL_VBOsek2X9k3TDsDH2lSnBlDQVWl9MyP3Qmw00rb6Utp4&s', 'Loren ipsum Loren ipsum Loren ipsum Loren ipsum ', '2020-04-19 13:38:34', '2020-04-19 13:38:34', 1),
(4, 'Super30 Film', 689, 'https://www.lg.com/sa_en/images/TV/features/signature-products-hero-d.jpg', 'Loren ipsum Loren ipsum Loren ipsum Loren ipsum ', '2020-04-19 13:38:43', '2020-04-19 13:38:43', 1),
(5, 'Watch', 699, 'https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg', 'Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum ', '2020-04-19 13:39:38', '2020-04-19 13:39:38', 1),
(6, 'Cricket Bat', 7999, 'https://3.imimg.com/data3/LT/QF/IMFCP-8454188/images-accessory_big-500x500.jpg', 'Loren ipsum Loren ipsum Loren ipsum Loren ipsum ', '2020-04-19 13:40:12', '2020-04-19 13:59:56', 1),
(7, 'Basket', 499, 'https://cdn.vox-cdn.com/thumbor/K2I66K4ljKJSpf9VnPG_mtx9d14=/0x0:2040x1360/1200x0/filters:focal(0x0:2040x1360):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/19206371/akrales_190914_3628_0262.jpg', 'Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum ', '2020-04-19 13:40:49', '2020-04-19 13:40:49', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email_address` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users_old`
--

CREATE TABLE `users_old` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_old`
--

INSERT INTO `users_old` (`id`, `name`, `email`, `createdAt`, `updatedAt`) VALUES
(1, 'Vishal', 'vishal@mail.com', '2020-04-19 13:35:27', '2020-04-19 13:35:27');

-- --------------------------------------------------------

--
-- Table structure for table `zbkp-products`
--

CREATE TABLE `zbkp-products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `zbkp-products`
--

INSERT INTO `zbkp-products` (`id`, `title`, `price`, `imageUrl`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Nailcutter', 225, 'https://www.danielwellington.com/media/staticbucket/media/catalog/product/d/w/dw-petite-st-mawes-rg-cat.png?ecom2=true&format=jpg&canvas=1:1&width=400&quality=80&bg-color=ffffff', 'Loren ipsum Loren ipsum Loren ipsum Loren ipsum ', '2020-04-18 05:23:36', '2020-04-18 05:23:36'),
(2, 'Super30 Film', 699, 'https://www.lg.com/sa_en/images/TV/features/signature-products-hero-d.jpg', 'Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum ', '2020-04-18 05:49:11', '2020-04-18 06:23:18'),
(3, 'ThePetShop', 1350, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvXYL_VBOsek2X9k3TDsDH2lSnBlDQVWl9MyP3Qmw00rb6Utp4&s', 'Loren ipsum Loren ipsum Loren ipsum Loren ipsum ', '2020-04-18 05:49:27', '2020-04-18 05:49:27'),
(4, 'Watch', 152, 'https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg', 'Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum ', '2020-04-18 05:49:41', '2020-04-18 05:49:41'),
(5, 'Cricket Bat', 156, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvXYL_VBOsek2X9k3TDsDH2lSnBlDQVWl9MyP3Qmw00rb6Utp4&s', 'Loren ipsum Loren ipsum Loren ipsum Loren ipsum ', '2020-04-18 05:50:02', '2020-04-18 15:13:10'),
(6, 'Bucket', 658, 'https://3.imimg.com/data3/LT/QF/IMFCP-8454188/images-accessory_big-500x500.jpg', 'Loren ipsum Loren ipsum Loren ipsum ', '2020-04-18 05:50:28', '2020-04-18 05:50:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cartItems_productId_cartId_unique` (`cartId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orderItems_orderId_productId_unique` (`orderId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_old`
--
ALTER TABLE `users_old`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zbkp-products`
--
ALTER TABLE `zbkp-products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cartitems`
--
ALTER TABLE `cartitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_old`
--
ALTER TABLE `users_old`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `zbkp-products`
--
ALTER TABLE `zbkp-products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD CONSTRAINT `cartitems_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cartitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users_old` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users_old` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users_old` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
