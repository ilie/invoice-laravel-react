import Button from "../ui/Button/Button";
import Input from "../ui/FormInputs/Input";
import { Formik, Form, Field, FieldArray } from "formik";
import SelectInput from "../ui/FormInputs/SelectInput";
import useListResource from "../../hooks/useListResource";
import DatePickerField from "../ui/FormInputs/DatePickerField";
import { newInvoiceSchema } from "../utils/schemas/yupValidations";
import { invoiceStatusOptions } from "../utils/data/";
import { isoToSql } from "../utils/formatters";
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

    const invoiceData = props.invoice.data;
    const clientData = invoiceData.relationships.client.data.attributes;
    const clientId = invoiceData.relationships.client.data.id;

    const invoiceStatus = invoiceStatusOptions.find(
        (status) => status.value === invoiceData.attributes.status
    );
    const invoiceItems = invoiceData.relationships.items.data;

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
        props.submitForm(data);

        if (props.success) {
            actions.resetForm();
        }
    };

    return (
        <div className="wrapper-500 m-4-auto p-2">
            <Formik
                validationSchema={newInvoiceSchema}
                initialValues={{
                    client_id: {
                        value: clientId,
                        label: clientData.name,
                    },

                    status: invoiceStatus,
                    irpf: invoiceData.attributes.irpf,
                    vat: invoiceData.attributes.vat,
                    items: invoiceItems.map((invoiceItem) => ({
                        item: {
                            value: invoiceItem.id,
                            label: invoiceItem.attributes.name,
                        },
                        date: new Date(invoiceItem.attributes.date),
                        quantity: invoiceItem.attributes.quantity,
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
                            placeholder="Please select a client"
                        />
                        <SelectInput
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
                        />
                        <FieldArray name="items">
                            {({ push, remove }) => (
                                <div className="formgroup">
                                    <label htmlFor="items">
                                        Items
                                        {` (${props.values.items.length}) `}
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
                                            key={index}
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
                        </FieldArray>
                        <div className="formgroup">
                            <input
                                type="submit"
                                value={
                                    props.isSubmitting
                                        ? "Saving data..."
                                        : "Update invoice"
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
