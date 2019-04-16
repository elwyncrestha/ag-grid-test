import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('agGrid') agGrid: AgGridNg2;

  title = 'ag-grid-test';

  columnDefs = [
    {headerName: 'Make', field: 'make', rowGroup: true },
    {headerName: 'Price', field: 'price' }
];

autoGroupColumnDef = {
  headerName: 'Model',
  field: 'model',
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: {
      checkbox: true
  }
};

rowData: any;

constructor(private http: HttpClient) {

}

ngOnInit() {
  this.rowData = this.http.get('https://api.myjson.com/bins/ly7d1');
}

getSelectedRows() {
  const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map( node => node.data );
        const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
}

}
