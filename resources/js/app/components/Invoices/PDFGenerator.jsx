import React from "react";
import {
    formatDate,
    sliceText,
    formatCurency,
    formatNumber,
} from "../utils/formatters";
import {
    calculateIrpf,
    calculateVat,
    calculateTotalAmount,
} from "../utils/calculations";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    document: {},
    page: {
        scale: "80%",
        backgroundColor: "white",
        color: "black",
        size: "A4",
        lineHeight: "1.3px",
        padding: "40px 60px",
        fontSize: "10px",
    },
    section: {
        marginBottom: "20px",
    },
    header: {
        display: "flex",
    },
    title: {
        fontSize: "18px",
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },
    rowSpaceBetween: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowMarginTopBottom: {
        display: "flex",
        flexDirection: "row",
        marginTop: "10px",
        marginBottom: "10px",
    },
    p: {
        marginTop: "10px",
    },
    half: {
        width: "50%",
    },
    halfBig: {
        width: "309px",
        marginLeft: "16px",
    },
    halfSmall: {
        width: "160px",
        // backgroundColor: "gray",
    },
    textRight: {
        textAlign: "right",
    },
    textCenter: {
        textAlign: "center",
    },

    company: {
        marginTop: "15px",
    },
    invoice: {
        marginTop: "15px",
    },
    tableHead: {
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-between",
        marginTop: "20px",
        // border: "1px solid black",
        // padding: "5px",
    },
    headConcepto: {
        width: "82px",
        padding: "5px",
        border: "1px solid black",
    },
    headDescripcion: {
        width: "220px",
        padding: "5px",
        borderTop: "1px solid black",
        borderRight: "1px solid black",
        borderBottom: "1px solid black",
    },
    headFecha: {
        width: "70px",
        padding: "5px",
        borderTop: "1px solid black",
        borderRight: "1px solid black",
        borderBottom: "1px solid black",
    },
    headPrecioU: {
        width: "80px",
        padding: "5px",
        borderTop: "1px solid black",
        borderRight: "1px solid black",
        borderBottom: "1px solid black",
    },
    headCantidad: {
        width: "60px",
        padding: "5px",
        borderTop: "1px solid black",
        borderRight: "1px solid black",
        borderBottom: "1px solid black",
    },
    tableBody: {
        marginBottom: "70px",
    },
    tableItem: {
        display: "flex",
        flexDirection: "row",
        borderBottom: "0.5px solid gray",
        padding: "5px",
    },
    bodyConcepto: {
        width: "82px",
        padding: "5px 1px",
    },
    bodyDescripcion: {
        width: "196px",
        padding: "5px 1px",
    },
    bodyFecha: {
        width: "70px",
        marginLeft: "5px",
        padding: "5px",
    },
    bodyPrecioU: {
        marginLeft: "2px",
        width: "80px",
        padding: "5px 6px",
    },
    bodyCantidad: {
        marginLeft: "4px",
        width: "40px",
        padding: "5px",
    },
    bold: {
        fontFamily: "Helvetica-Bold",
        fontWeight: "bold",
    },
    boldTextRight: {
        fontFamily: "Helvetica-Bold",
        fontWeight: "bold",
        fontSize: "11px",
        width: "100%",
        textAlign: "right",
        paddingRight: "10px",
        // marginTop: "5px",
    },
    viewer: {
        height: "100vh",
        width: "100vw",
    },
    baseBold: {
        fontFamily: "Helvetica-Bold",
        fontWeight: "bold",
        fontSize: "9px",
        width: "67px",
        textAlign: "right",
        marginRight: "6px",
        marginLeft: "30px",
    },
    base: {
        width: "67px",
        textAlign: "right",
        marginRight: "6px",
        marginLeft: "30px",
    },

    irpfBold: {
        fontFamily: "Helvetica-Bold",
        fontWeight: "bold",
        fontSize: "9px",
        width: "35px",
        textAlign: "right",
        marginRight: "7px",
    },
    irpf: {
        width: "35px",
        textAlign: "right",
        marginRight: "7px",
    },
    tasaIrpfBold: {
        fontFamily: "Helvetica-Bold",
        fontWeight: "bold",
        fontSize: "9px",
        width: "47px",
        textAlign: "right",
        marginRight: "5px",
    },
    tasaIrpf: {
        width: "47px",
        textAlign: "right",
        marginRight: "5px",
    },
    ivaBold: {
        fontFamily: "Helvetica-Bold",
        fontWeight: "bold",
        fontSize: "9px",
        width: "40px",
        textAlign: "right",
        marginRight: "10px",
    },
    iva: {
        width: "40px",
        textAlign: "right",
        marginRight: "10px",
    },
    tasaIvaBold: {
        fontFamily: "Helvetica-Bold",
        fontWeight: "bold",
        fontSize: "9px",
        width: "49px",
        textAlign: "right",
        marginRight: "10px",
    },
    tasaIva: {
        width: "49px",
        textAlign: "right",
        marginRight: "10px",
    },
});

const PDFGenerator = ({ invoice }) => {
    console.log(invoice.data);
    const invoiceItems = invoice.data.relationships.items.data;
    console.log(invoiceItems);
    const companyName = import.meta.env.VITE_COMPANY_NAME;
    const companyAddress = import.meta.env.VITE_COMPANY_ADDRESS;
    const companyPhone = import.meta.env.VITE_COMPANY_PHONE;
    const companyNif = import.meta.env.VITE_COMPANY_NIF;
    const companyContactPhone = import.meta.env.VITE_CONTACT_PHONE;
    const companyContactEmail = import.meta.env.VITE_CONTACT_EMAIL;
    const companyBankAccount = import.meta.env.VITE_CONTACT_BANK_ACCOUNT;
    const vatValue = calculateVat(
        invoice.data.attributes.amount,
        invoice.data.attributes.vat
    );
    const irpfValue = calculateIrpf(
        invoice.data.attributes.amount,
        invoice.data.attributes.irpf
    );
    const totalAmount = calculateTotalAmount(
        invoice.data.attributes.amount,
        irpfValue,
        vatValue
    );
    return (
        <PDFViewer style={styles.viewer}>
            <Document style={styles.document}>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <div style={styles.header}>
                            <Text style={styles.title}>Factura</Text>
                            <div style={styles.company}>
                                <Text style={styles.bold}>{companyName}</Text>
                                <Text>{companyAddress}</Text>
                                <Text>{companyPhone}</Text>
                                <Text>{companyNif}</Text>
                            </div>
                            <div style={styles.invoice}>
                                <div style={styles.row}>
                                    <div style={styles.half}>
                                        <div style={styles.row}>
                                            <Text style={styles.bold}>
                                                Número de factura:{" "}
                                            </Text>
                                            <Text>{invoice.data.id}</Text>
                                        </div>
                                        <div style={styles.row}>
                                            <Text style={styles.bold}>
                                                Fecha de factura:{" "}
                                            </Text>
                                            <Text>
                                                {formatDate(
                                                    invoice.data.attributes
                                                        .created_at
                                                )}
                                            </Text>
                                        </div>
                                        <div style={styles.row}>
                                            <Text style={styles.bold}>
                                                Fecha de emision:{" "}
                                            </Text>
                                            <Text>
                                                {formatDate(
                                                    invoice.data.attributes
                                                        .updated_at
                                                )}
                                            </Text>
                                        </div>
                                    </div>
                                    <div style={styles.half}>
                                        <div style={styles.row}>
                                            <Text style={styles.bold}>
                                                Cliente:{" "}
                                            </Text>
                                            <Text>
                                                {
                                                    invoice.data.relationships
                                                        .client.data.attributes
                                                        .name
                                                }
                                            </Text>
                                        </div>
                                        <div style={styles.row}>
                                            <Text style={styles.bold}>
                                                CIF / NIF:{" "}
                                            </Text>
                                            <Text>
                                                {
                                                    invoice.data.relationships
                                                        .client.data.attributes
                                                        .cif
                                                }
                                            </Text>
                                        </div>
                                        <Text>
                                            {
                                                invoice.data.relationships
                                                    .client.data.attributes
                                                    .address
                                            }
                                        </Text>
                                    </div>
                                </div>
                            </div>
                            <div style={styles.tableHead}>
                                <Text style={styles.headConcepto}>
                                    Concepto
                                </Text>
                                <Text style={styles.headDescripcion}>
                                    Descripción
                                </Text>
                                <Text style={styles.headFecha}>Fecha</Text>
                                <Text style={styles.headPrecioU}>
                                    Precio unitario excl. IVA
                                </Text>
                                <Text style={styles.headCantidad}>
                                    Cantidad
                                </Text>
                            </div>
                            <div style={styles.tableBody}>
                                {invoiceItems.map((invoiceItem) => {
                                    return (
                                        <div
                                            style={styles.tableItem}
                                            key={invoiceItem.id}
                                        >
                                            <Text style={styles.bodyConcepto}>
                                                {sliceText(
                                                    invoiceItem.attributes.name
                                                )}
                                            </Text>
                                            <Text
                                                style={styles.bodyDescripcion}
                                            >
                                                {sliceText(
                                                    invoiceItem.attributes
                                                        .description,
                                                    35
                                                )}
                                            </Text>
                                            <Text style={styles.bodyFecha}>
                                                {formatDate(
                                                    invoiceItem.attributes.date
                                                )}
                                            </Text>
                                            <Text style={styles.bodyPrecioU}>
                                                {formatCurency(
                                                    invoiceItem.attributes.price
                                                )}
                                            </Text>
                                            <Text style={styles.bodyCantidad}>
                                                {
                                                    invoiceItem.attributes
                                                        .quantity
                                                }
                                            </Text>
                                        </div>
                                    );
                                })}
                            </div>
                            <div style={styles.rowSpaceBetween}>
                                <div style={styles.halfSmall}>
                                    <Text>
                                        El pago de la factura se debe efectuar
                                        por transferencia bancaria en cuenta
                                        número:
                                    </Text>
                                    <Text>{companyBankAccount}</Text>
                                    <Text style={styles.p}>
                                        Si tiene alguna duda acerca de la
                                        factura o de la forma de pago, póngase
                                        en contacto conmigo en el teléfono:{" "}
                                        {companyContactPhone} o por correo
                                        electrónico en la dirección:{" "}
                                        {companyContactEmail}
                                    </Text>
                                </div>
                                <div style={styles.halfBig}>
                                    <div style={styles.row}>
                                        <Text style={styles.baseBold}>
                                            Base imponible
                                        </Text>
                                        <Text style={styles.irpfBold}>
                                            IRPF
                                        </Text>
                                        <Text style={styles.tasaIrpfBold}>
                                            Retención IRPF
                                        </Text>
                                        <Text style={styles.ivaBold}>IVA</Text>
                                        <Text style={styles.tasaIvaBold}>
                                            Tasa de IVA
                                        </Text>
                                    </div>
                                    <div style={styles.rowMarginTopBottom}>
                                        <Text style={styles.base}>
                                            {formatNumber(
                                                invoice.data.attributes.amount
                                            )}
                                        </Text>
                                        <Text style={styles.irpf}>
                                            {formatNumber(irpfValue)}
                                        </Text>
                                        <Text style={styles.tasaIrpf}>
                                            {formatNumber(
                                                invoice.data.attributes.irpf
                                            )}
                                            {" %"}
                                        </Text>
                                        <Text style={styles.iva}>
                                            {formatNumber(vatValue)}
                                        </Text>
                                        <Text style={styles.tasaIva}>
                                            {formatNumber(
                                                invoice.data.attributes.vat
                                            )}
                                            {" %"}
                                        </Text>
                                    </div>
                                    <div style={styles.row}>
                                        <Text style={styles.boldTextRight}>
                                            Precio total:{" "}
                                            {formatCurency(totalAmount)}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default PDFGenerator;
