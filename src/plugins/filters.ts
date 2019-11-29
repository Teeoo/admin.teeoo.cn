import moment from 'moment'

moment.locale('zh-cn')

export const Filters: { [key: string]: any } = {
    fromNow(value: string): string {
        return moment.utc(String(value)).fromNow()
    },
    formatTemplate(value: string) {
        if (value === 'files') {
            return '文章归档'
        } else if (value === 'links') {
            return '友情链接'
        } else if (value === 'cross') {
            return '时光机'
        } else if (value === 'github') {
            return '项目'
        } else if (value === 'message') {
            return '留言板'
        } else {
            return '默认'
        }
    }
}
