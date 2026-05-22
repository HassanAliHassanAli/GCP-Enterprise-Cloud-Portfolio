import streamlit as st
import pandas as pd
import plotly.express as px
import numpy as np

# Page Configuration
st.set_page_config(page_title="Enterprise BI Dashboard", page_icon="📈", layout="wide")

st.title("📈 Enterprise Business Intelligence Dashboard")
st.markdown("Automated Cloud-Hosted Analytics for ERP & Supply Chain Data")
st.markdown("---")

# Generate Mock ERP Data
@st.cache_data
def load_data():
    np.random.seed(42)
    dates = pd.date_range(start="2026-01-01", periods=100)
    data = pd.DataFrame({
        'Date': dates,
        'Region': np.random.choice(['Alexandria', 'Cairo', 'Giza', 'Mansoura'], size=100),
        'Product_Category': np.random.choice(['Electronics', 'Furniture', 'Software', 'Logistics'], size=100),
        'Sales_Volume': np.random.randint(1000, 50000, size=100),
        'Operational_Cost': np.random.randint(500, 30000, size=100)
    })
    data['Profit_Margin'] = data['Sales_Volume'] - data['Operational_Cost']
    return data

df = load_data()

# KPI Metrics Section
st.header("📊 Key Performance Indicators (KPIs)")
col1, col2, col3, col4 = st.columns(4)

total_sales = f"${df['Sales_Volume'].sum():,.0f}"
avg_profit = f"${df['Profit_Margin'].mean():,.0f}"
top_region = df.groupby('Region')['Sales_Volume'].sum().idxmax()
total_orders = len(df)

col1.metric("Total Sales Volume", total_sales, "+12% vs Last Month")
col2.metric("Average Profit Margin", avg_profit, "Optimized")
col3.metric("Top Performing Region", top_region)
col4.metric("Total Transactions", total_orders)

st.markdown("---")

# Interactive Charts Section
col_chart1, col_chart2 = st.columns(2)

with col_chart1:
    st.subheader("Regional Sales Distribution")
    fig_region = px.pie(df, values='Sales_Volume', names='Region', hole=0.4, 
                        color_discrete_sequence=px.colors.sequential.RdBu)
    st.plotly_chart(fig_region, use_container_width=True)

with col_chart2:
    st.subheader("Profit Margin by Product Category")
    fig_bar = px.bar(df, x='Product_Category', y='Profit_Margin', color='Product_Category',
                     color_discrete_sequence=px.colors.qualitative.Prism)
    st.plotly_chart(fig_bar, use_container_width=True)

# Data Table Section
st.markdown("---")
st.subheader("📑 Raw ERP Transaction Data")
st.dataframe(df.sort_values(by='Date', ascending=False).head(10), use_container_width=True)