from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "AI Business Analyst API is running securely."})

@app.route('/api/analyze', methods=['POST'])
def analyze_text():
    data = request.get_json() or {}
    text = data.get("text", "").lower()
    
    # Structural logic for ERP routing
    category = "General Inquiry"
    if "invoice" in text or "tax" in text or "فاتورة" in text:
        category = "Finance & Accounting"
    elif "shipping" in text or "delay" in text or "شحن" in text:
        category = "Supply Chain & Logistics"
        
    return jsonify({
        "status": "success",
        "analyzed_text": text,
        "assigned_department": category,
        "agent_version": "1.0"
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)