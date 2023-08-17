FROM python:3.7

WORKDIR /app
COPY ./my_app ./

RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt


RUN python manage.py collectstatic
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
#CMD ["gunicorn", "main.wsgi:application", "--bind", "0.0.0.0:8000"]