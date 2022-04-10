export class ResponseBody {
    status: number;
    success: boolean;
    data: any;

    // tslint:disable-next-line: ban-types
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
