-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 09, 2018 at 05:11 PM
-- Server version: 5.6.34-log
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hi24`
--

-- --------------------------------------------------------

--
-- Table structure for table `header_ad`
--

CREATE TABLE `header_ad` (
  `id` int(11) NOT NULL,
  `ad_stat` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `img_url` varchar(90) COLLATE utf8_unicode_ci NOT NULL,
  `caption_stat` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `caption_text` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `header_ad`
--

INSERT INTO `header_ad` (`id`, `ad_stat`, `img_url`, `caption_stat`, `caption_text`) VALUES
(1, 'item active', 'images/in_img/b01.jpg', 'carousel-caption', 'Caption 1'),
(2, 'item', 'images/in_img/b02.jpg', NULL, NULL),
(3, 'item', 'http://placehold.it/1900x1080&text=Slide Three', 'carousel-caption', 'Caption 3');

-- --------------------------------------------------------

--
-- Table structure for table `product_default_photos`
--

CREATE TABLE `product_default_photos` (
  `id` int(11) NOT NULL,
  `main_photo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `inner_photo1` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `inner_photo2` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `inner_photo3` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `inner_photo4` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `product_list_ref_id` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_item_detail`
--

CREATE TABLE `product_item_detail` (
  `id` int(11) NOT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `item_id` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `size` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `main_photo_subtituder` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `product_list_ref_id` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_list`
--

CREATE TABLE `product_list` (
  `id` int(11) NOT NULL,
  `active_stat` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `activity_text` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `img_url` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `price_org` int(11) NOT NULL,
  `price_dis` int(11) NOT NULL,
  `category_main` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `category_sub` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product_list`
--

INSERT INTO `product_list` (`id`, `active_stat`, `activity_text`, `img_url`, `title`, `price_org`, `price_dis`, `category_main`, `category_sub`) VALUES
(1, 'p_active_media', 'sale', 'images/men/accessories/a001a-1.jpg', '棉質條紋寬領長袖T恤-女', 290, 260, 'men', 'upper'),
(2, 'p_active_media bg_g', 'new', 'images/men/coat/ct001a-1.jpg', '棉質條紋寬領長袖T恤-女', 290, 260, 'men', 'upper'),
(3, NULL, NULL, 'images/men/home$inside/h002a-2.jpg', '棉質條紋寬領長袖T恤-女', 290, 260, 'women', 'upper'),
(4, NULL, NULL, 'images/women/sweater/sw001a-1.jpg', '棉質條紋寬領長袖T恤-女', 290, 260, 'kid', 'upper'),
(5, NULL, NULL, 'images/women/shirt/s004a-1.jpg', '棉質條紋寬領長袖T恤-女', 290, 260, 'men', 'shoes'),
(6, NULL, NULL, 'images/women/sweater/sw002a-1.jpg', '棉質條紋寬領長袖T恤-女', 290, 260, 'women', 'upper'),
(7, NULL, NULL, 'images/women/coat/ct003a-3.jpg', '棉質條紋寬領長袖T恤-女', 290, 260, 'men', 'upper'),
(8, NULL, NULL, 'images/women/sweater/sw004a-1.jpg', '棉質條紋寬領長袖T恤-女', 290, 260, 'kid', 'upper'),
(9, 'p_active_media', 'sale', 'images/men/accessories/a001a-1.jpg', '棉質條紋寬領長袖T恤-中', 300, 400, 'men', 'upper');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `header_ad`
--
ALTER TABLE `header_ad`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_default_photos`
--
ALTER TABLE `product_default_photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_item_detail`
--
ALTER TABLE `product_item_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_list`
--
ALTER TABLE `product_list`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `header_ad`
--
ALTER TABLE `header_ad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `product_default_photos`
--
ALTER TABLE `product_default_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_item_detail`
--
ALTER TABLE `product_item_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_list`
--
ALTER TABLE `product_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
