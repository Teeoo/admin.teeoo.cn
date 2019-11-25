import moment from 'moment'

moment.locale('zh-cn')

export const Filters: any = {
    fromNow(value: string): string {
        return moment.utc(String(value)).fromNow()
    }
}
