import ExcelJS from 'exceljs'
import saveAs from "file-saver";
/**
 * 
 * @param {*} myData : data cần export
 * @param {*} fileName : tên file
 * @param {*} sheetName : tên sheetName
 * @param {*} report : tên title
 * @param {*} myHeader : mảng các trường header
 * @param {*} widths :độ dài mảng
 * @returns 
 * export file excel
 * Created by TVLOI 30/08/2022
 */
async function exportToExcelPro(
    myData,
	fileName,
	sheetName,
	report,
	myHeader,
	widths
) {
	if (!myData || myData.length === 0) {
		console.error('Chưa có dữ liệu');
		return;
	}

	const wb = new ExcelJS.Workbook();
	const ws = wb.addWorksheet(sheetName);
	const columns = myHeader?.length;
	// config cho title
	const title = {
		border: true,
		money: false,
		height: 100,
		font: { size: 30, bold: false, color: { argb: 'FFFFFF' } },
		alignment: { horizontal: 'center', vertical: 'middle' },
		fill: {
			type: 'pattern',
			pattern: 'solid', //darkVertical
			fgColor: {
				argb: '0000FF',
			},
		},
	};
	// config cho header
	const header = {
		border: true,
		money: false,
		height: 70,
		font: { size: 15, bold: false, color: { argb: 'FFFFFF' } },
		alignment: { horizontal: 'center', vertical: 'middle' },
		fill: {
			type: 'pattern',
			pattern: 'solid', //darkVertical
			fgColor: {
				argb: 'FF0000',
			},
		},
	};
	// config cho các row
	const data = {
		border: true,
		money: false,
		height: 0,
		font: { size: 12, bold: false, color: { argb: '000000' } },
		alignment: null,
		fill: null,
	};
	// set width cho các column
	if (widths && widths.length > 0) {
		ws.columns = widths;
	}
	// tạo row title
	let row = addRow(ws, [report], title);
	// ghép cột cho title
	mergeCells(ws, row, 1, columns);
	// tạo row header
	addRow(ws, myHeader, header);
	// tạo row data
	myData.forEach((row) => {
		addRow(ws, Object.values(row), data);
	});
	// lưu file
	const buf = await wb.xlsx.writeBuffer();
	saveAs(new Blob([buf]), `${fileName}.xlsx`);
}
/**
 * 
 * @param {*} ws : Worksheet
 * @param {*} data : mảng dữ liệu
 * @param {*} section : config cell
 * @returns 
 * thêm row
 * Created by LVKIEN 26/08/2022
 */
function addRow(ws, data, section) {
	const borderStyles = {
		top: { style: 'thin' },
		left: { style: 'thin' },
		bottom: { style: 'thin' },
		right: { style: 'thin' },
	};
	const row = ws.addRow(data);
	// cấu hình cho các cell
	row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
		if (section?.border) {
			cell.border = borderStyles;
		}
		if (section?.money && typeof cell.value === 'number') {
			cell.alignment = { horizontal: 'right', vertical: 'middle' };
			cell.numFmt = '$#,##0.00;[Red]-$#,##0.00';
		}
		if (section?.alignment) {
			cell.alignment = section.alignment;
		} else {
			cell.alignment = { vertical: 'middle' };
		}
		if (section?.font) {
			cell.font = section.font;
		}
		if (section?.fill) {
			cell.fill = section.fill;
		}
	});
	if (section?.height > 0) {
		row.height = section.height;
	}
	return row;
}

/**
 * 
 * @param {*} ws : WorkSheet
 * @param {*} row : đại diện cho row trong excel
 * @param {*} from : từ vị trí
 * @param {*} to : đến vị trí
 * ghép cột
 * Created by LVKIEN 26/08/2022
 */
function mergeCells(ws, row, from, to) {
	ws.mergeCells(`${row.getCell(from)._address}:${row.getCell(to)._address}`);
}

export default exportToExcelPro
