const TableBuilder = function () {
    let thead;
    let tbody;
    return {
        withHeaders: function (headerName = []) {
            let tableHeadersHtml = '';
            headerName.forEach(headerName => {
                tableHeadersHtml += `
                    <th scope="col">${headerName}</th>
                `;
            });
            this.thead = `
                <thead class="table-dark">
                    <tr>
                        ${tableHeadersHtml}
                    </tr>
                </thead>
            `;
            return this;
        },
        withRows: function (rows = '') {
            this.tbody = `
                <tbody>
                    ${rows}
                </tbody>
            `;
            return this;
        },
        build: function () {
            return `
                <table class="table align-middle text-center table-row-dashed">
                    ${this.thead}
                    ${this.tbody}
                </table>
            `;
        }
    };


};

export default TableBuilder;