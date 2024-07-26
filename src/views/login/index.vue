<template>
  <div class="page-login">
    <a-row align="stretch" class="login-box">
      <a-col :xs="0" :sm="12" :md="15">
        <div class="login-left">
          <img class="login-left__img" src="@/assets/svg/login-img.svg" />
        </div>
      </a-col>
      <a-col :xs="24" :sm="12" :md="9">
        <div class="login-right">
          <a-form
            ref="formRef"
            :size="1 ? 'large' : 'medium'"
            :model="form"
            :rules="rules"
            :style="{ width: '84%' }"
            :label-col-style="{ display: 'none' }"
            :wrapper-col-style="{ flex: 1 }"
            @submit="handleLogin"
          >
            <h3 class="login-right__title">
              <img class="logo" src="@/assets/logo.svg" /><span>Y · Admin</span>
            </h3>
            <a-form-item field="username">
              <a-input v-model="form.username" placeholder="账号 admin/user" allow-clear>
                <template #prefix>
                  <icon-user :stroke-width="1" :style="{ fontSize: '20px' }" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item field="password">
              <a-input-password v-model="form.password" placeholder="密码" allow-clear>
                <template #prefix>
                  <icon-lock :stroke-width="1" :style="{ fontSize: '20px' }" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-row justify="space-between" align="center" class="w-full">
                <a-checkbox
                  :model-value="loginConfig.rememberPassword"
                  @change="setRememberPassword as any"
                >
                  记住密码
                </a-checkbox>
                <a-link @click="handleForgotPassword">忘记密码</a-link>
              </a-row>
            </a-form-item>
            <a-form-item>
              <a-space direction="vertical" fill class="w-full">
                <a-button type="primary" size="large" long :loading="btnLoading" html-type="submit">
                  登录
                </a-button>
                <a-button type="text" size="large" long class="register-btn">注册账号</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>

    <LoginBg></LoginBg>
  </div>
</template>

<script setup lang="ts">
import { Message, type FormInstance, type ValidatedError } from '@arco-design/web-vue'
import LoginBg from './components/LoginBg/index.vue'
import { useLoading } from '@/hooks'
import { useUserStore } from '@/stores'
import { useStorage } from '@vueuse/core'
import { useStorageKey } from '@/utils/storage'
import { ROUTE_NAME_HOME } from '@/consts'

defineOptions({ name: 'PageLogin' })

const userStore = useUserStore()
const router = useRouter()

// 登录加载
const { loading: btnLoading, setLoading } = useLoading()

const loginConfig = useStorage(useStorageKey('login-config'), {
  /** 是否记住密码 */
  rememberPassword: true,
  username: 'admin',
  password: '123456',
})

const form = reactive({
  username: loginConfig.value.username,
  password: loginConfig.value.password,
})

const rules: FormInstance['rules'] = {
  username: [{ required: true, message: '请输入账号' }],
  password: [
    { required: true, message: '请输入密码' },
    { match: /^\d{6,16}$/, message: '输入密码格式不正确' },
  ],
}

const handleLogin = async ({
  values,
  errors,
}: {
  values: Record<string, any>
  errors: Record<string, ValidatedError> | undefined
}) => {
  if (btnLoading.value || errors) return

  setLoading(true)
  try {
    await userStore.login(values)

    // 路由跳转
    const { redirect, ...otherQuery } = router.currentRoute.value.query
    router.push({
      name: (redirect as string) || ROUTE_NAME_HOME,
      query: { ...otherQuery },
    })
    Message.success('登录成功')

    // 记住账号
    const { rememberPassword } = loginConfig.value
    const { username, password } = values
    // 实际生产环境需要进行加密存储。
    // The actual production environment requires encrypted storage.
    loginConfig.value.username = rememberPassword ? username : ''
    loginConfig.value.password = rememberPassword ? password : ''
  } catch (err) {
    Message.error((err as Error)?.message)
  } finally {
    setLoading(false)
  }
}

const setRememberPassword = (value: boolean) => {
  loginConfig.value.rememberPassword = value
}

const handleForgotPassword = () => {
  Message.info('todo 重置密码')
}
</script>

<style lang="scss" scoped>
.page-login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    width: 86%;
    max-width: 720px;
    height: 380px;
    display: flex;
    z-index: 999;
    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.08);
  }
}

.login-left {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(60deg, rgb(var(--primary-6)), rgb(var(--primary-3)));

  &__img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: all 0.3s;
    object-fit: cover;
  }
}

.login-right {
  width: 100%;
  height: 100%;
  background: var(--color-bg-1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  box-sizing: border-box;

  &__title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
      width: 32px;
      height: 32px;
      margin-right: 6px;
    }
  }
}

.register-btn,
.register-btn:hover {
  color: var(--color-text-2);
}
</style>
