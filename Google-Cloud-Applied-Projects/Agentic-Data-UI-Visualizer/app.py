import streamlit as st
import pandas as pd
import google.generativeai as genai
import matplotlib.pyplot as plt
import io
import contextlib

st.set_page_config(page_title="Agentic Data UI", page_icon="📊", layout="wide")
st.title("📊 Agentic Data UI (Dynamic Visualizer)")
st.markdown("Upload a CSV file and ask the AI to visualize or analyze it. The UI adapts to your prompt!")

with st.sidebar:
    st.header("⚙️ Configuration")
    api_key = st.text_input("Enter Gemini API Key:", type="password")
    
uploaded_file = st.file_uploader("📂 Upload a CSV file", type=["csv"])

if uploaded_file is not None:
    df = pd.read_csv(uploaded_file)
    st.write("### Preview of your data:")
    st.dataframe(df.head())
    
    user_prompt = st.text_input("💬 What do you want to do with this data? (e.g., 'Draw a bar chart of Sales by Region')")
    
    if st.button("Generate UI 🚀") and user_prompt and api_key:
        with st.spinner("🤖 AI is designing the UI..."):
            genai.configure(api_key=api_key)
            
            # Auto-detect valid model (same logic as our last project for bulletproof execution)
            target_model = None
            for m in genai.list_models():
                if 'generateContent' in m.supported_generation_methods:
                    target_model = m.name
                    break
                    
            if target_model:
                model = genai.GenerativeModel(target_model)
                
                # Prompting Gemini to write Python code that uses Streamlit and Matplotlib
                ai_prompt = f"""
                You are a Python data visualization expert.
                I have a pandas DataFrame named `df` with the following columns: {list(df.columns)}.
                The user wants: "{user_prompt}"
                
                Write ONLY the Python code to achieve this using `matplotlib.pyplot` (as `plt`) and `streamlit` (as `st`).
                - Do NOT include `import` statements.
                - Do NOT wrap the code in markdown formatting (like ```python ... ```). 
                - Just return the raw code.
                - If creating a plot, use `fig, ax = plt.subplots()` and pass `fig` to `st.pyplot(fig)`.
                """
                
                try:
                    response = model.generate_content(ai_prompt)
                    generated_code = response.text.replace("```python", "").replace("```", "").strip()
                    
                    st.markdown("### ✨ Generated Dynamic UI:")
                    
                    # Execute the generated code safely capturing output
                    with st.expander("Show AI Generated Code"):
                        st.code(generated_code, language="python")
                    
                    # Redirect stdout in case the AI uses print() instead of st.write()
                    f = io.StringIO()
                    with contextlib.redirect_stdout(f):
                        exec(generated_code, globals(), {'df': df, 'st': st, 'plt': plt})
                    
                except Exception as e:
                    st.error(f"❌ Error generating UI: {e}")
            else:
                 st.error("❌ No valid Gemini model found.")