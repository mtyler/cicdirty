#!/bin/sh

kubectl apply -f namespace.yaml
kubectl apply -f volumes.yaml
kubectl apply -f role.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

kubectl config set-context --current --namespace=cicdirty