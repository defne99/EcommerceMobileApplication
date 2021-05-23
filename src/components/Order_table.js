import React, {useState,useEffect} from "react";
import useTable from "../components/DataTable";
import {TableBody,Toolbar,makeStyles, TableCell, TableRow,InputAdornment,Paper } from "@material-ui/core";

import Controls from "../../../controls/Controls";
import ConfirmDialog from "../../../Components_foradmin/main_productmanager/ConfirmDialog";
import Notification from "../../../Components_foradmin/main_productmanager/Notification";
import CheckIcon from '@material-ui/icons/Check';
import Axios from "axios";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import jsPDFInvoiceTemplate, {OutputType} from "jspdf-invoice-template";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position:'absolute',
        right:'10px',
    }
}))


const headCells = [
    { id: 'productname', label: 'Product Name' },
    { id: 'category', label: 'Category' },
    { id: 'genre', label: 'Genre' },
    { id: 'boughtPrice', label: 'Bought Price' },
    { id: 'boughtDate', label: 'Bought Date' },
    { id: 'currentSituation', label: 'Current Situation' },
    { id:'Refund',label:'Request',disableSorting:true}
]


function Order_table(){
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [records,setRecords]=useState([]); //this is the records in table
    const {TblContainer, TblHead, TblPagination,recordsAfterPagingAndSorting }= useTable(records,headCells,filterFn);
    const classes = useStyles();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })



    useEffect(()=>{
        getListorderfromAPI();
    },[]);



    const getListorderfromAPI = async () => {

        return fetch('http://localhost:8080/order/refundRequests', {  //burası değişecek URL DEĞİŞECEK!!!
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("List of records: ", json);
                setRecords(json.invoices);
            }).catch((error) => {
                console.error(error);
            });
    };
    const pdfGenerate=()=>{

        let invoiceDetail = {
            outputType: OutputType.DataUrlNewWindow,
            returnJsPDFDocObject: true,
            fileName: "Invoice 2021",
            orientationLandscape: false,
            logo: {
                src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
                width: 53.33, //aspect ratio = width/height
                height: 26.66,
                margin: {
                    top: 0, //negative or positive num, from the current position
                    left: 0 //negative or positive num, from the current position
                }
            },
            business: {
                name: "Business Name",
                address: "Albania, Tirane ish-Dogana, Durres 2001",
                phone: "(+355) 069 11 11 111",
                email: "email@example.com",
                email_1: "info@example.al",
                website: "www.example.al",
            },
            contact: {
                label: "Invoice issued for:",
                name: "Client Name",
                address: "Albania, Tirane, Astir",
                phone: "(+355) 069 22 22 222",
                email: "client@website.al",
                otherInfo: "www.website.al",
            },
            invoice: {
                label: "Invoice #: ",
                invTotalLabel: "Total:",
                num: 19,
                invDate: "Payment Date: 01/01/2021 18:12",
                invGenDate: "Invoice Date: 02/02/2021 10:17",
                header: ["#", "Description", "Price", "Quantity", "Unit", "Total"],
                headerBorder: false,
                tableBodyBorder: false,
                table: Array.from(Array(10), (item, index)=>({
                    num: index + 1,
                    desc: "There are many variations ",
                    price: 200.5,
                    quantity: 4.5,
                    unit: "m2",
                    total: 400.5
                })),
                invTotal: "145,250.50",
                invCurrency: "ALL",
                row1: {
                    col1: 'VAT:',
                    col2: '20',
                    col3: '%',
                    style: {
                        fontSize: 10 //optional, default 12
                    }
                },
                row2: {
                    col1: 'SubTotal:',
                    col2: '116,199.90',
                    col3: 'ALL',
                    style: {
                        fontSize: 10 //optional, default 12
                    }
                },
                invDescLabel: "Invoice Note",
                invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
            },
            footer: {
                text: "The invoice is created on a computer and is valid without the signature and stamp.",
            },
            pageEnable: true,
            pageLabel: "Page ",
        };
        jsPDFInvoiceTemplate({...invoiceDetail});

    }

    const onRequest = id => {  //buraya approve api gelecek

        Axios.put('http://localhost:8080/order/approveRefund?id='+ parseFloat(id) + "&b=true")
            .then(res=>{
                console.log(res)
                if (res.status===200) {

                    fetch('http://localhost:8080/order/refundRequests',{  //burası refund
                        method: 'GET',

                    })
                        .then((response) => response.json())
                        .then((json) => {
                            console.log("List of refund requests: ", json);
                            setRecords(json);
                        }).catch((error) => {
                        console.error(error);
                    });
                }
                else {
                    if (res.status === 400) {
                        alert("Not approved");
                    }
                    else {
                        alert("Something went wrong!");
                    }
                }

            });
        setNotify({
            isOpen: true,
            message: 'Refund Request is sent successfully',
            type:'success',
        })
    }

    return (
        <>
            <div className="main2">
                <div className="main__container">
                    {records.map(items =>
                        <Paper elevation={20} className={classes.pageContent}>
                            <Toolbar>
                                <Controls.Button
                                    text="View Invoice"
                                    variant="outlined"
                                    startIcon={<InsertDriveFileIcon/>}
                                    className={classes.newButton}
                                    onClick={() => {
                                        pdfGenerate()
                                    }}
                                />
                            </Toolbar>
                            <TblContainer>
                                <TblHead />
                                <TableBody>
                                    {
                                        items.orders.map(item =>
                                            (<TableRow key={item.orderModel.id}>
                                                <TableCell>{item.productModel.productName}</TableCell>
                                                <TableCell>{item.productModel.category}</TableCell>
                                                <TableCell>{item.productModel.genre}</TableCell>
                                                <TableCell>{item.orderModel.boughtPrice}</TableCell>
                                                <TableCell>{item.orderModel.boughtDate}</TableCell>
                                                <TableCell>{item.orderModel.currentSituation}</TableCell>
                                                {item.orderModel.currentSituation=="Delivered" || item.orderModel.currentSituation=="Refunded" ? ""
                                                    :
                                                    (<TableCell>
                                                        <Controls.ActionButton
                                                            color="green"
                                                            onClick={() => {  //reject case

                                                            }}
                                                        >
                                                            <CheckIcon fontSize="small"/>
                                                        </Controls.ActionButton>
                                                    </TableCell> )}

                                            </TableRow>)
                                        )
                                    }
                                </TableBody>
                            </TblContainer>
                            <TblPagination />
                        </Paper>)
                    }

                </div>
            </div>
        </>
    );
}

export default Order_table;
