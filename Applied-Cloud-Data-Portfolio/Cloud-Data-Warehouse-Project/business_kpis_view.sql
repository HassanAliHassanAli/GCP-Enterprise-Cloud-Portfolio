CREATE OR REPLACE VIEW `my-project-1-496722.ecommerce_analytics.business_kpis` AS
SELECT 
  Region,
  Category,
  ROUND(SUM(Sales), 2) AS Total_Sales,
  ROUND(SUM(Profit), 2) AS Total_Profit,
  COUNT(*) AS Total_Transactions
FROM 
  `my-project-1-496722.ecommerce_analytics.sales_raw`
GROUP BY 
  Region, Category
ORDER BY 
  Total_Sales DESC;