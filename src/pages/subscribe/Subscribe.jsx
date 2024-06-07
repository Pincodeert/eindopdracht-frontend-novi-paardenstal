import NavBar from "../../components/navBar/NavBar.jsx";
import HeaderContent from "../../components/headerContent/HeaderContent.jsx";
import "./Subscribe.css"
import generateSubscriptionDetails from "../../helpers/generateSubscriptionDetails.js";
import TextInput from "../../components/textInput/TextInput.jsx";
import Button from "../../components/button/Button.jsx";
import Footer from "../../components/footer/Footer.jsx";
import SubscribeCard from "../../components/subscribeCard/SubscribeCard.jsx";
import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext.jsx";
import {SubscriptionContext} from "../../context/SubscriptionContext.jsx";

function Subscribe() {
    const [subscription, setSubscription] = useState({});
    const [error, setError] = useState("");
    // const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    // const [termsFormState, toggleTermsFormState] = useState({
    //     termsAndConditions: false,
    // });
    const [newlyCustomerId, setNewlyCustomerId] = useState(null);
    // const [assignUserSuccess, toggleAssignUserSuccess] = useState(false);
    const [newlyHorseId, setNewlyHorseId] = useState(null);
    const [step, setStep] = useState("");

    const navigate = useNavigate();
    const {subscriptionId} = useParams();
    const {register, formState: {errors}, handleSubmit} = useForm({mode: "onBlur"});
    const {user, completeUserInfo} = useContext(AuthContext);
    const {resetSubscription} = useContext(SubscriptionContext);

    const token = localStorage.getItem('token');


    //// alle abonnement-typen ophalen ////
    useEffect(() => {
        async function fetchSubscription(subscriptionId) {
            setError("");

            try {
                const response = await axios.get(`http://localhost:8080/subscriptions/${subscriptionId}`);
                console.log(response.data);
                setSubscription(response.data);
            } catch (error) {
                console.error(error);
                setError("het ophalen van de abonnement is niet gelukt");
            }
        }

        void fetchSubscription(subscriptionId);
    }, []);

    ///
    useEffect(() => {
        function determineStep() {
            if (user.customerProfile) {
                setStep("step2")
            } else {
                setStep("step1")
            }
        }

        console.log("dit is de cpId van de ingelogde user", user.customerProfile, user);
        determineStep();
    }, []);


    // function handleImageChange(e) {
    //     const uploadedFile = e.target.files[0];
    //     console.log(uploadedFile);
    //     setFile(uploadedFile);
    //     setPreviewUrl(URL.createObjectURL(uploadedFile));
    // }

    function generatePreview(e){
        // const uploadedFile = e.target.files[0];
        // console.log(uploadedFile);
        // setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }


///////// Handle Submit ////////////
    async function handleSubmitCustomer(customerFormState) {

        setError("");

        try {
            console.log("dit gaan we zo posten naar de backend: ", customerFormState);
            const response = await axios.post("http://localhost:8080/customerprofiles", {
                ...customerFormState
            });
            console.log(response);
            console.log(response.status);
            console.log("de klant is succesvol toegevoegd. de nieuwe id is: ", response.data);
            setNewlyCustomerId(response.data);
            // setStep("step2");
        } catch (error) {
            console.error(error);
            setError(error);
        }
        console.log(customerFormState); //hier nog een userId (voor de inputDTO) aan toevoegen?
        console.log("de nieuwe klantId = ", newlyCustomerId);
    }

    // koppelt user aan klant
    async function assignUserToCustomer() {
        setError("");
        console.log("deze klantId gaan we nu koppelen: ", newlyCustomerId);
        try {
            const response = await axios.put(`http://localhost:8080/customerprofiles/${newlyCustomerId}/user`, {
                username: user.username,
            });
            // toggleAssignUserSuccess(true); // hebben we dit eigenlijk wel nodig?
            console.log("koppelen is gelukt: ", response) // de data in de response=null omdat backendfunctie hierin niet voorziet

            //// hier moet de newlyCustomerId als customerProfileId worden opgeslagen in de context.
            completeUserInfo(newlyCustomerId);
            setStep("step2");
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    //maakt een nieuw paard aan
    async function handleSubmitHorse(horseFormState) {
        setError("");
        console.log("dit paard gaan we zo opslaan: ", horseFormState);
        try {
            const response = await axios.post("http://localhost:8080/horses", {
                ...horseFormState,
                preferredSubscription: subscription.name,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response);
            console.log(response.status);
            console.log("het paard is succesvol toegevoegd. de nieuwe id is: ", response.data);
            setNewlyHorseId(response.data);
            setStep("step3")
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    console.log("de newlyHorseId is: ", newlyHorseId);

    //paard koppelen aan klant:
    async function assignHorseToCustomer() {
        setError("");
        try {
            const response = await axios.put(`http://localhost:8080/horses/${newlyHorseId}/customerprofile`, {
                "id": user.customerProfile,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response);
            console.log("het is je gewoon gelukt!!!")
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    async function handleSubmitPassport(fileFormState) {

        setError("");
        console.log("dit is de paspoortFormState: ", fileFormState);
        const formData = new FormData();
        formData.append("file", fileFormState.file[0]);
        // formData.append("passportName", passport.name);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const response = await axios.post(`http://localhost:8080/horses/${newlyHorseId}/passport`, formData, config);
            console.log("het bestand is geupload ");
            console.log(response);
            setStep("step4");
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    function handleSubmitTerms(termsFormState) {
        void assignHorseToCustomer();
        console.log("akkoord?: " + termsFormState.termsAndConditions);
        resetSubscription();
        // navigate(`/profiel/${newlyCustomerId}`);
        navigate(`/profiel/${user.customerProfile}`)
    }

    return (
        <>
            <header className="outer-container header-section">
                <div className="inner-container">
                    <NavBar
                        classname="header-navigation"
                    />
                    <HeaderContent/>
                </div>
            </header>
            <main>
                <section className="outer-container intro-section">
                    <div className="inner-container">
                        {Object.keys(subscription).length > 0 &&
                            <p className="intro-line">Fijn dat u het {subscription.name} wilt aflsuiten </p>}
                        <p className="italic">{generateSubscriptionDetails(subscription)}</p>
                    </div>
                </section>
                <section className="outer-container intro-section">
                    <div className="inner-container">
                        <div className="profile-content-container">
                            {/*/////////// stap 1 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                            {step === "step1" &&
                                <SubscribeCard
                                    subscribeCardTitle="Stap 1 - Vul uw persoonsgegevens in"
                                    subscribeStep="step1"
                                >
                                    {!newlyCustomerId ? <form onSubmit={handleSubmit(handleSubmitCustomer)}>
                                            <TextInput
                                                labelFor="firstName-text-field"
                                                inputId="firstName-text-field"
                                                inputName="firstName"
                                                register={register}
                                                validationRules={{
                                                    required: {
                                                        value: true,
                                                        message: "Voornaam is verplicht"
                                                    },
                                                    minLength: {
                                                        value: 2,
                                                        message: "Voornaam moet minimaal 2 letters bevatten"
                                                    },
                                                    maxLength: {
                                                        value: 60,
                                                        message: "Voornaam mag maximaal 60 letters bevatten"
                                                    }
                                                }}
                                                errors={errors}
                                            >
                                                Voornaam:
                                            </TextInput>
                                            <TextInput
                                                labelFor="lastName-text-field"
                                                inputId="lastName-text-field"
                                                inputName="lastName"
                                                register={register}
                                                validationRules={{
                                                    required: {
                                                        value: true,
                                                        message: "Achternaam is verplicht"
                                                    },
                                                    minLength: {
                                                        value: 2,
                                                        message: "Achternaam moet minimaal 2 letters bevatten"
                                                    },
                                                    maxLength: {
                                                        value: 60,
                                                        message: "Achternaam mag maximaal 60 letters bevatten"
                                                    }
                                                }}
                                                errors={errors}
                                            >
                                                Achternaam:
                                            </TextInput>
                                            <TextInput
                                                labelFor="street-text-field"
                                                inputId="street-text-field"
                                                inputName="street"
                                                register={register}
                                                validationRules={{
                                                    required: {
                                                        value: true,
                                                        message: "Straat is verplicht"
                                                    },
                                                    minLength: {
                                                        value: 3,
                                                        message: "Straat moet minimaal 3 letters bevatten"
                                                    },
                                                    maxLength: {
                                                        value: 60,
                                                        message: "Straat mag maximaal 60 letters bevatten"
                                                    }
                                                }}
                                                errors={errors}
                                            >
                                                Straat:
                                            </TextInput>
                                            <TextInput
                                                labelFor="houseNumber-text-field"
                                                inputId="houseNumbername-text-field"
                                                inputName="houseNumber"
                                                register={register}
                                                validationRules={{
                                                    required: {
                                                        value: true,
                                                        message: "Huisnummer is verplicht"
                                                    },
                                                    minLength: {
                                                        value: 1,
                                                        message: "Huisnummer moet uit minimaal 1 teken bestaan"
                                                    },
                                                    maxLength: {
                                                        value: 20,
                                                        message: "Huisnummer mag maximaal uit 20 tekens bestaan"
                                                    }
                                                }}
                                                errors={errors}
                                            >
                                                Huisnummer:
                                            </TextInput>
                                            <TextInput
                                                labelFor="postalCode-text-field"
                                                inputId="postalCode-text-field"
                                                inputName="postalCode"
                                                register={register}
                                                validationRules={{
                                                    required: {
                                                        value: true,
                                                        message: "Postcode is verplicht"
                                                    },
                                                    minLength: {
                                                        value: 4,
                                                        message: "Postcode moet minimaal 4 tekens bevatten"
                                                    },
                                                    maxLength: {
                                                        value: 6,
                                                        message: "Postcode mag maximaal 6 tekens bevatten"
                                                    }
                                                }}
                                                errors={errors}
                                            >
                                                Postcode:
                                            </TextInput>
                                            <TextInput
                                                labelFor="residence-text-field"
                                                inputId="residence-text-field"
                                                inputName="residence"
                                                register={register}
                                                validationRules={{
                                                    required: {
                                                        value: true,
                                                        message: "Woonplaats is verplicht"
                                                    },
                                                    minLength: {
                                                        value: 2,
                                                        message: "Woonplaats moet minimaal 2 letters bevatten"
                                                    },
                                                    maxLength: {
                                                        value: 60,
                                                        message: "Woonplaats mag maximaal 60 letters bevatten"
                                                    }
                                                }}
                                                errors={errors}
                                            >
                                                Woonplaats:
                                            </TextInput>
                                            <label htmlFor="email-field">
                                                E-mail:
                                                <input
                                                    type="email"
                                                    id="email-field"
                                                    {...register("emailAddress", {
                                                        required: {
                                                            value: true,
                                                            message: 'e-mailadres is verplicht',
                                                        },
                                                    })}
                                                />
                                                {errors.emailAddress &&
                                                    <p className="form-error">{errors.emailAddress.message}</p>}
                                            </label>
                                            <label htmlFor="telephone-field">
                                                Telefoonnummer:
                                                <input
                                                    type="tel"
                                                    id="telephone-field"
                                                    pattern="[0-9]{10}"
                                                    placeholder="0123456789"
                                                    {...register("telephoneNumber", {
                                                        required: {
                                                            value: true,
                                                            message: 'telefoonnummer is verplicht',
                                                        },
                                                        minLength: {
                                                            value: 10,
                                                            message: "het telefoonnummer moet uit 10 cijfers bestaan"
                                                        },
                                                        maxLength: {
                                                            value: 10,
                                                            message: "het telefoonnummer moet uit 10 cijfers bestaan"
                                                        }
                                                    })}
                                                />
                                                {errors.telephoneNumber &&
                                                    <p className="form-error">{errors.telephoneNumber.message}</p>}
                                            </label>
                                            <TextInput
                                                labelFor="bankAccount-text-field"
                                                inputId="bankAccount-text-field"
                                                inputName="bankAccountNumber"
                                                register={register}
                                                validationRules={{
                                                    required: {
                                                        value: true,
                                                        message: "bank/IBAN-nummer is verplicht"
                                                    },
                                                    minLength: {
                                                        value: 16,
                                                        message: "De Iban moet uit 16 tekens bestaan"
                                                    },
                                                    maxLength: {
                                                        value: 16,
                                                        message: "De Iban moet uit 16 tekens bestaan"
                                                    }
                                                }}
                                                errors={errors}
                                            >
                                                IBAN:
                                            </TextInput>
                                            <Button
                                                type="submit"
                                                disabled={false}
                                            >
                                                Sla op
                                            </Button>
                                        </form>
                                        : <div>
                                            <p> Uw persoonsgevens zijn succesvol toegevoegd!</p>
                                            <Button
                                                type="button"
                                                disabled={false}
                                                handleClick={assignUserToCustomer}
                                            >
                                                Volgende stap
                                            </Button>
                                        </div>}
                                </SubscribeCard>}
                            {/*/////////// stap 2 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                            {step === "step2" &&
                                <SubscribeCard
                                    subscribeCardTitle="Stap 2 - Vul de gegevens van uw paard in"
                                    subscribeStep="step2"
                                >
                                    <form onSubmit={handleSubmit(handleSubmitHorse)}>
                                        <TextInput
                                            labelFor="horsename-text-field"
                                            inputId="horsename-text-field"
                                            inputName="name"
                                            register={register}
                                            validationRules={{
                                                required: {
                                                    value: true,
                                                    message: "Paardnaam is verplicht"
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: "Paardnaam moet minimaal 2 letters bevatten"
                                                },
                                                maxLength: {
                                                    value: 60,
                                                    message: "Paardnaam mag maximaal 60 letters bevatten"
                                                }
                                            }}
                                            errors={errors}
                                        >
                                            Naam:
                                        </TextInput>
                                        <TextInput
                                            labelFor="horseNumber-text-field"
                                            inputId="horseNumber-text-field"
                                            inputName="horseNumber"
                                            register={register}
                                            validationRules={{
                                                required: {
                                                    value: true,
                                                    message: "Paardnummer is verplicht"
                                                },
                                                minLength: {
                                                    value: 14,
                                                    message: "Paardnummer moet 14 tekens bevatten"
                                                },
                                                maxLength: {
                                                    value: 14,
                                                    message: "Paardnummer moet 14 tekens bevatten"
                                                }
                                            }}
                                            errors={errors}
                                        >
                                            Paardnummer:
                                        </TextInput>
                                        <label htmlFor="typeOfFeed-field">
                                            Voeding:
                                        </label>
                                        <select
                                            id="typeOfFeed-field"
                                            {...register("typeOfFeed", {
                                                required: {
                                                    value: true,
                                                    message: "maak een keuze",
                                                }
                                            })}
                                        >
                                            <option value="hay">hooi</option>
                                            <option value="oats">haver</option>
                                            <option value="grass">vers gras</option>
                                        </select>
                                        {errors.typeOfFeed && <p className="form-error">{errors.typeOfFeed.message}</p>}
                                        <label htmlFor="typeOfBedding-field">
                                            Bodembedekking:
                                        </label>
                                        <select
                                            id="typeOfBedding-field"
                                            {...register("typeOfBedding", {
                                                required: {
                                                    value: true,
                                                    message: "maak een keuze",
                                                }
                                            })}
                                        >
                                            <option value="straw">stro</option>
                                            <option value="shavings">houtvezel</option>
                                            <option value="flax">vlas</option>
                                        </select>
                                        {errors.typeOfBedding &&
                                            <p className="form-error">{errors.typeOfBedding.message}</p>}
                                        <TextInput
                                            labelFor="vet-text-field"
                                            inputId="vet-text-field"
                                            inputName="nameOfVet"
                                            register={register}
                                            validationRules={{
                                                required: {
                                                    value: true,
                                                    message: "Naam van dierenarts is verplicht"
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: "Naam moet minimaal 2 letters bevatten"
                                                },
                                                maxLength: {
                                                    value: 60,
                                                    message: "Naam mag maximaal 60 letters bevatten"
                                                }
                                            }}
                                            errors={errors}
                                        >
                                            Dierenarts:
                                        </TextInput>
                                        <TextInput
                                            labelFor="residenceOfVet-text-field"
                                            inputId="residenceOfVet-text-field"
                                            inputName="residenceOfVet"
                                            register={register}
                                            validationRules={{
                                                required: {
                                                    value: true,
                                                    message: "Woonplaats van dierenarts is verplicht"
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: "Woonplaats moet minimaal 2 letters bevatten"
                                                },
                                                maxLength: {
                                                    value: 60,
                                                    message: "Woonplaats mag maximaal 60 letters bevatten"
                                                }
                                            }}
                                            errors={errors}
                                        >
                                            Woonplaats dierenarts:
                                        </TextInput>
                                        <label htmlFor="telephoneOfVet-field">
                                            Telnr dierenarts:
                                            <input
                                                type="tel"
                                                id="telephoneOfVet-field"
                                                pattern="[0-9]{10}"
                                                placeholder="0123456789"
                                                {...register("telephoneOfVet", {
                                                    required: {
                                                        value: true,
                                                        message: 'telefoonnummer is verplicht',
                                                    },
                                                    minLength: {
                                                        value: 10,
                                                        message: "het telefoonnummer moet uit 10 cijfers bestaan"
                                                    },
                                                    maxLength: {
                                                        value: 10,
                                                        message: "het telefoonnummer moet uit 10 cijfers bestaan"
                                                    }
                                                })}
                                            />
                                            {errors.telephoneOfVet &&
                                                <p className="form-error">{errors.telephoneOfVet.message}</p>}
                                        </label>
                                        {/*{Object.keys(subscription).length > 0 &&*/}
                                        {/*    <label htmlFor="subscription-hidden-field">*/}
                                        {/*        {subscription.name}*/}
                                        {/*        <input*/}
                                        {/*            type="hidden"*/}
                                        {/*            id="subscription-hidden-field"*/}
                                        {/*            {...register("preferredSubscription")}*/}
                                        {/*            // name="preferredSubscription"*/}
                                        {/*            // value={subscription.name}*/}
                                        {/*        />*/}
                                        {/*    </label>}*/}
                                        <Button
                                            type="submit"
                                            disabled={false}
                                        >
                                            Sla op
                                        </Button>
                                    </form>
                                </SubscribeCard>}
                            {/*/////////// stap 3 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                            {step === "step3" &&
                                <SubscribeCard
                                    subscribeCardTitle="Stap 3 - Voeg een kopie van het paardenpaspport van uw paard toe"
                                    subscribeStep="step3"
                                >
                                    <form onSubmit={handleSubmit(handleSubmitPassport)}>
                                        <label htmlFor="file-upload-field">
                                            Upload hier uw paardenpaspoort:
                                            <input
                                                type="file"
                                                id="file-upload-field"
                                                {...register("file", {
                                                    required: {
                                                        value: true,
                                                        message: "Het uploaden van een paardenpaspoort is verplicht"
                                                    }
                                                })}
                                                onChange={generatePreview}
                                            />
                                            {errors.file && <p className="form-error">{errors.file.message}</p>}
                                        </label>
                                        {/*<input type="submit"/>*/}
                                        {previewUrl &&
                                            <label htmlFor="preview-file">
                                                <img src={previewUrl}
                                                     alt="Voorbeeld van de afbeelding die zojuist gekozen is"
                                                     className="image-preview"/>
                                            </label>}
                                        <Button
                                            type="submit"
                                            disabled={false}
                                        >
                                            Voeg toe
                                        </Button>
                                    </form>
                                </SubscribeCard>}
                            {/*/////////// stap 4 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                            {step === "step4" &&
                                <SubscribeCard
                                    subscribeCardTitle="Stap 4 - Ga akkoord en bevestig aanvraag"
                                    subscribeStep="step4"
                                >
                                    <form onSubmit={handleSubmit(handleSubmitTerms)}>
                                        <div className="label-input-combi">
                                            <input
                                                className="checkbox"
                                                type="checkbox"
                                                id="terms-and-conditions-field"
                                                name="termsAndConditions"
                                                {...register("termsAndConditions", {
                                                    required: {
                                                        value: true,
                                                        message: "invullen verplicht"
                                                    }
                                                })}
                                                // checked={termsAndConditionsValue}
                                                // onChange={() => toggleTermsAndConditionsValue(!termsAndConditionsValue)}
                                                // checked={termsFormState.termsAndConditions}
                                                // onChange={handleTermsChange}
                                                // required={true}
                                            />
                                            <label htmlFor="terms-and-conditions-field">
                                                Ik ga akkoord met de voorwaarden
                                            </label>
                                            {errors.termsAndConditions &&
                                                <p className="form-error">{errors.termsAndConditions.message}</p>}
                                        </div>
                                        {/*<input type="submit"/>*/}
                                        <Button
                                            type="submit"
                                            disabled={false}
                                        >
                                            Sla op
                                        </Button>
                                    </form>
                                </SubscribeCard>}
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Subscribe;