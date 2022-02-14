import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Formatter from './formatter'

Vue.use(VueI18n)

const locale = 'en-US'
const formatter = new Formatter({ locale })

export default new VueI18n({
  locale,
  formatter,
  messages: {
    'en-US': {
      message: {
        generate: 'Generate',
        newPoll: 'New Poll',
        multiple: 'Multiple',
        activePoll: 'Active Poll',
        question: 'Question',
        askQuestion: 'Ask a question (Optional)',
        options: 'Options',
        enterOptions: 'Enter options (e.g., BTC, XIN, ETH, etc.)',
        addAnotherOption: 'Add another option',
        createTip: 'Don\'t forget to share the generated poll to Mixin.',
        closeTip: 'Close this tip',
        shareTip: 'Click right-top ··· to share this poll to Mixin.',
        alreadyVote: 'You have already voted.',
        forgetOption: 'You forgot to fill up some options.',
        createSuccess: 'You may now copy the generated poll to Mixin.',
        createError: 'An error occured trying to generate a poll.',
        pollNotFound: 'Poll not found.',
        voteSuccess: 'You have voted successfully.',
        optionNotFound: 'Can not find voted option.',
        settings: 'Settings',
        dueDate: 'Due Date',
        selectDatetime: 'Select datetime',
        forgetDueDate: 'You forget to set the due date',
        pollEnded: 'This poll has ended',
        endedPoll: 'Ended Poll',
        left: '{date} left',
      }
    },
    'zh': {
      message: {
        generate: '创建',
        newPoll: '创建投票',
        multiple: '多选',
        activePoll: '进行中的投票',
        question: '问题',
        askQuestion: '提出一个问题 (可选)',
        options: '选项',
        enterOptions: '输入选项 (例如：BTC, XIN, ETH, 等等)',
        addAnotherOption: '添加另一个选项',
        createTip: '不要忘记分享创建的投票到 Mixin。',
        closeTip: '隐藏提示',
        shareTip: '点击右上角 ··· 分享投票到 Mixin。',
        alreadyVote: '你已经投过票了。',
        forgetOption: '你忘记了增加一些选项。',
        createSuccess: '你可以现在将创建的投票分享到 Mixin。',
        createError: '创建投票时出现错误。',
        pollNotFound: '投票不存在。',
        voteSuccess: '投票成功。',
        optionNotFound: '找不到投票选项。',
        settings: '设置',
        dueDate: '截止日期',
        selectDatetime: '选择日期时间',
        forgetDueDate: '你忘记了设置截止日期',
        pollEnded: '该投票已经结束',
        endedPoll: '已结束的投票',
        left: '剩下 {date}',
      }
    },
    'ja': {
      message: {
        generate: '作成',
        newPoll: '投票を作成する',
        multiple: '複数選択可',
        activePoll: '投票中',
        question: '質問',
        askQuestion: '質問する（任意）',
        options: 'オプション',
        enterOptions: '入力オプション（例：BTC、XIN、ETHなど）',
        addAnotherOption: '別のオプションを追加する',
        createTip: '作成した投票をMixinに共有することを忘れないでください。',
        closeTip: 'このヒントを閉じる',
        shareTip: '右上をクリック···Mixinに投票を共有する。',
        alreadyVote: 'すでに投票済みです。',
        forgetOption: 'オプションの追加を忘れています。',
        createSuccess: '作成した投票をMixinに共有できるようになりました。',
        createError: '投票の作成中にエラーが発生しました。',
        pollNotFound: '投票が存在しません。',
        voteSuccess: '投票が成功しました。',
        optionNotFound: '投票のオプションが見つかりません。',
        settings: '設定',
        dueDate: '期限',
        selectDatetime: '日付を選択',
        forgetDueDate: '期限を設定することを忘れています',
        pollEnded: '投票は終了しました。',
        endedPoll: '投票終了',
        left: '残り{date}',
      }
    }
  }
})
