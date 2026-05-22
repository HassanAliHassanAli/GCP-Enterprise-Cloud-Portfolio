import streamlit as st
from youtube_transcript_api import YouTubeTranscriptApi
import google.generativeai as genai

# Page Configuration for Enterprise Look
st.set_page_config(
    page_title="AI Business Analyst Assistant", 
    page_icon="📊", 
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Styling adjustments for professional view
st.title("📊 AI Business Analyst Assistant")
st.markdown("### *Bridging the Gap Between Unstructured Corporate Data & Strategic ERP Solutions*")
st.markdown("---")

# Sidebar Configuration for secure credentials entry
with st.sidebar:
    st.header("⚙️ System Configuration")
    api_key = st.text_input("Enter Gemini API Key:", type="password", help="Provide your secure Google AI Studio API Key.")
    st.markdown("---")
    st.markdown("""
    ### 💡 Core Capabilities:
    - **ERP Alignment**: Identifies module mappings for Odoo & SAP.
    - **Supply Chain Optimization**: Pinpoints inventory, forecasting, and logic gaps.
    - **Advanced KPI Extraction**: Suggests analytical metrics (Power BI/Tableau ready).
    """)

# Main Content Interface
input_method = st.radio(
    "Select Enterprise Data Ingestion Method:", 
    ["YouTube Video URL (Case Study / Briefing)", "Paste Corporate Text / Transcript Directly (Bypass Infrastructure Blocks)"]
)

video_url = ""
pasted_text = ""

if input_method == "YouTube Video URL (Case Study / Briefing)":
    video_url = st.text_input("🔗 Enter Target YouTube Video URL:")
else:
    pasted_text = st.text_area("📝 Paste Transcript, Operational Article, or Business Case Study here (Max 15,000 characters):", height=250)

# Execution Trigger
if st.button("Generate Enterprise Analysis Report 🚀"):
    if not api_key:
        st.warning("⚠️ Access Denied: Please enter a valid Gemini API Key in the left sidebar configuration.")
    elif input_method == "YouTube Video URL (Case Study / Briefing)" and not video_url:
        st.warning("⚠️ Input Missing: Please provide a valid YouTube video URL.")
    elif input_method == "Paste Corporate Text / Transcript Directly (Bypass Infrastructure Blocks)" and not pasted_text:
        st.warning("⚠️ Input Missing: Please paste the textual data or case study to initiate analysis.")
    else:
        transcript_text = ""
        try:
            # Phase 1: Data Ingestion & Extraction
            if input_method == "YouTube Video URL (Case Study / Briefing)":
                with st.spinner("⏳ Ingesting pipeline: Extracting video transcript data..."):
                    if "v=" in video_url:
                        video_id = video_url.split("v=")[1].split("&")[0]
                    elif "youtu.be/" in video_url:
                        video_id = video_url.split("youtu.be/")[1].split("?")[0]
                    else:
                        video_id = video_url.split("/")[-1].split("?")[0]
                        
                    api = YouTubeTranscriptApi()
                    transcripts = api.list(video_id)
                    fetched_transcript = next(iter(transcripts)).fetch()
                    transcript_text = " ".join([d['text'] for d in fetched_transcript])
            else:
                transcript_text = pasted_text
            
            # Phase 2: Dynamic LLM Auto-Discovery & Contextualization
            with st.spinner("🤖 Orchestrating AI Core: Discovering authorized model instances..."):
                genai.configure(api_key=api_key)
                
                # Auto-Discovery mechanism to query active text-generation infrastructure
                target_model = None
                for m in genai.list_models():
                    if 'generateContent' in m.supported_generation_methods:
                        target_model = m.name
                        break
                
                if not target_model:
                    st.error("❌ Infrastructure Fault: No valid content-generation models discovered on this API credential.")
                    st.stop()

                model = genai.GenerativeModel(target_model)
                
                # Specialized Senior Business Analyst Framework Prompt
                prompt = f"""
                You are operating as a Senior Business Analyst and Enterprise Architect specializing in ERP Systems (Odoo/SAP), Supply Chain Optimization, and Data Analytics pipelines.
                
                Analyze the following raw input text/transcript thoroughly and construct a highly professional corporate-grade consulting report. 
                
                The final output MUST include the following explicit sections:
                1. EXECUTIVE SUMMARY: High-level overview of the current operational landscape.
                2. CORE BUSINESS CHALLENGES: Clear separation of operational bottlenecks, data visibility constraints, and structural inefficiencies.
                3. ERP MODULE & TECHNOLOGY MAPPING: Map the discovered problems directly to standard ERP workflows (e.g., Inventory, Procurement, CRM, Accounting) and suggest optimization approaches (e.g., utilizing Odoo or SAP).
                4. PROCESS OPTIMIZATION ('AS-IS' to 'TO-BE'): Concrete strategic recommendations to automate or refine workflows.
                5. DATA ANALYTICS & KEY PERFORMANCE INDICATORS (KPIs): Specific, measurable metrics that can be tracked via tools like Power BI or Tableau to measure deployment success.
                
                Source Data Block:
                {transcript_text[:15000]}
                """
                
                # Execute reasoning engine
                response = model.generate_content(prompt)
                
                st.success(f"✅ Analysis Complete! (Infrastructure Model: {target_model.split('/')[-1]})")
                st.markdown("---")
                st.markdown("### 📑 Enterprise Architecture & Business Report")
                st.write(response.text)
                
        except Exception as e:
            st.error(f"❌ System Exception Raised: {e}")
            st.info("💡 Troubleshooting Directive: Cloud infrastructure IPs are frequently restricted by video networks. Please utilize the direct 'Paste Corporate Text' option to evaluate the application's AI capabilities.")