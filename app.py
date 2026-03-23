import streamlit as st
import google.generativeai as genai

# --- 1. 基础网页设置 ---
st.set_page_config(page_title="我的 AI 作品集", page_icon="🤖")
st.title("🌟 我的 Gemini 智能助手")
st.caption("基于 Google Gemini 1.5 驱动的个人项目展示")

# --- 2. 安全读取 API Key ---
# 注意：这个 KEY 稍后在 Streamlit 部署页面的 Advanced Settings -> Secrets 里填写
if "GEMINI_API_KEY" in st.secrets:
    genai.configure(api_key=st.secrets["GEMINI_API_KEY"])
else:
    st.error("❌ 未检测到 API Key，请在部署后台配置 Secrets。")
    st.stop()

# --- 3. 核心模型配置 (从 AI Studio 搬运处) ---
# 💡 这里是你以后“重复调整”的核心区域
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash", # 如果你用的是 Pro 版本，请改为 gemini-1.5-pro
    system_instruction="""
    你是一位拥有10年经验的资深视觉设计总监和审美专家。
你的任务是协助用户（可能是面试官或客户）了解我的设计风格和专业能力。
1. 语气：专业、优雅、富有逻辑，偶尔带一点设计师的艺术感。
2. 核心能力：精通色彩理论、排版布局、品牌视觉语言和用户体验（UX）。
3. 互动要求：如果用户询问设计建议，请从构图、对比度、平衡感等专业维度回答。
4. 目标：展示我作为一个视觉设计师的深度思考，而不仅仅是美工。
    """
)

# --- 4. 聊天界面逻辑 (标准模板) ---
if "messages" not in st.session_state:
    st.session_state.messages = []

# 显示历史消息
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# 处理用户输入
if prompt := st.chat_input("输入你的问题..."):
    # 用户说话
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # AI 回复
    with st.chat_message("assistant"):
        try:
            # 调用模型生成内容
            response = model.generate_content(prompt)
            st.markdown(response.text)
            st.session_state.messages.append({"role": "assistant", "content": response.text})
        except Exception as e:
            st.error(f"❌ 运行出错: {e}")
