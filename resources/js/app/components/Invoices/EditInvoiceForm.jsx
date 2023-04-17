import Button from "../ui/Button/Button";
import Input from "../ui/FormInputs/Input";
import { Formik, Form, Field, FieldArray } from "formik";
import SelectInput from "../ui/FormInputs/SelectInput";
import useListResource from "../../hooks/useListResource";
import DatePickerField from "../ui/FormInputs/DatePickerField";
import { newInvoiceSchema } from "../utils/schemas/yupValidations";
import useGetResourceByID from "../../hooks/useGetResourceByID";

const EditInvoiceForm = (props) => {
    // Clients
    const { list: clients, isLoading: loadingClients } =
        useListResource("clients");
    const clientsList = clients.map((client) => ({
        value: client.id,
        label: client.name,
    }));

    // Items
    const { list, isLoading } = useListResource("items");
    const options = list.map((item) => ({ value: item.id, label: item.name }));

    // Consts
    const invoiceData = props.invoice.data;
    const clientData = invoiceData.relationships.client.data;
    console.log(clientData);
    // // Selected Client
    // const {
    //     resource: selectedClient,
    //     loading: loadingSelectedClient,
    //     error: errorSelectedClient,
    // } = useGetResourceByID("/clients", clientData.id);
    // console.log(selectedClient.name);

    // Selected Item

    const submitHandler = (values, actions) => {
        const data = {
            client_id: values.client_id.value,
            status: values.status.value,
            irpf: values.irpf,
            vat: values.vat,
            items: values.items.map((item) => ({
                item_id: item.item.value,
                date: isoToSql(item.date),
                quantity: item.quantity,
            })),
        };
        props.onSubmitForm(data);

        if (props.success) {
            actions.resetForm();
        }
    };

    // console.log(invoiceData);

    return (
        <div className="wrapper-500 m-4-auto p-2">
            <Formik
                // validationSchema={newInvoiceSchema}
                initialValues={{
                    client_id: {
                        value: clientData.id,
                        label: clientData.name,
                    },

                    status: invoiceData.attributes.status,
                    irpf: invoiceData.attributes.irpf,
                    vat: invoiceData.attributes.vat,
                    items: invoiceData.relationships.items.data.map((item) => ({
                        item: item.attributes.name,
                        date: item.attributes.date,
                        quantity: item.attributes.quantity,
                    })),
                }}
                onSubmit={submitHandler}
            >
                {(props) => (
                    <Form className="form">
                        <SelectInput
                            label="Client"
                            name="client_id"
                            isLoading={loadingClients}
                            options={clientsList}
                            value={{
                                value: clientData.id,
                                label: clientData.name,
                            }}
                            placeholder="Please select a client"
                        />
                        {/* <SelectInput
                            label="Status"
                            name="status"
                            options={invoiceStatusOptions}
                            placeholder="Please select a status"
                        />
                        <Input
                            label="IRPF"
                            name="irpf"
                            maxLength="4"
                            step={0.5}
                            type="number"
                        />
                        <Input
                            label="VAT"
                            name="vat"
                            maxLength="4"
                            step={0.5}
                            type="number"
                        /> */}
                        {/* <FieldArray name="items">
                            {({ push, remove }) => (
                                <div className="formgroup">
                                    <label htmlFor="items">
                                        Items{" "}
                                        <Button
                                            btnType="primary-sm"
                                            click={() =>
                                                push({
                                                    item: "",
                                                    date: "",
                                                    quantity: "",
                                                })
                                            }
                                        >
                                            Add item
                                        </Button>
                                    </label>
                                    {props.values.items.map((item, index) => (
                                        <div
                                            className="display-flex-row"
                                            key={makeid()}
                                        >
                                            <div className="inputs">
                                                <SelectInput
                                                    nowrap={true}
                                                    index={index}
                                                    name={`items[${index}].item`}
                                                    options={options}
                                                    isLoading={isLoading}
                                                />
                                                <DatePickerField
                                                    index={index}
                                                    name={`items[${index}].date`}
                                                />
                                                <Input
                                                    className="quantity"
                                                    name={`items[${index}].quantity`}
                                                    maxLength="4"
                                                    step={0.5}
                                                    type="number"
                                                />
                                            </div>
                                            <div className="input-controls">
                                                <Button
                                                    btnType="control"
                                                    click={() => remove(index)}
                                                >
                                                    -
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </FieldArray> */}
                        <div className="formgroup">
                            <input
                                type="submit"
                                value={
                                    props.isSubmitting
                                        ? "Saving invoice..."
                                        : "Create invoice"
                                }
                                // disabled={props.isSubmitting || !props.isValid}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditInvoiceForm;
