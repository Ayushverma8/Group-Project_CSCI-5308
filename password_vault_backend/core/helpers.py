from django.template.loader import render_to_string
from django.utils.html import strip_tags

from django.conf import settings
from django.core.mail import send_mail


def send_email(template_name, context, subject, to_email):
    """
    Send the email to passed email address

    @param to_email: Email address
    @param subject: Subject to be sent in email
    @param template_name: HTML tamplate name to be used for this email
    @param context: dictionary of data to be used in template for rendering
    @return: True if email sent successfully

    @author: Deep Adeshra <dp974154@gmail.com>
    """

    html_message = render_to_string(template_name, context=context)

    plain_message = strip_tags(html_message)
    send_mail(subject, plain_message, settings.FROM_EMAIL,
              [to_email], html_message=html_message)

    return True


def get_site_url():
    """
    @return: current url of hosted server either dev/staging/prod
    @author: Deep Adeshra <dp974154@dal.ca>
    """

    mode = settings.MODE

    #TODO: Make this abstract using django sites

    if mode == "devel":
        return "http://localhost:8000"
    else:
        return "https://group5.iayush.xyz"